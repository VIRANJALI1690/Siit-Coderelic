import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, BackHandler, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { config } from './ip-config';

export default function App() {
    const webViewRef = useRef(null);

    // This script is injected into the web app to intercept network requests.
    // It replaces 'localhost' and '127.0.0.1' with your computer's actual IP address.
    // This is required because 'localhost' on a phone refers to the phone itself.
    const injectedScript = `
    (function() {
      const targetIP = '${config.localIP}';
      
      // Patch fetch
      const originalFetch = window.fetch;
      window.fetch = async function() {
        let args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
          args[0] = args[0]
            .replace('localhost', targetIP)
            .replace('127.0.0.1', targetIP);
        } else if (args[0] && args[0].url) {
          args[0] = new Request(
            args[0].url.replace('localhost', targetIP).replace('127.0.0.1', targetIP),
            args[0]
          );
        }
        return originalFetch.apply(this, args);
      };

      // Patch XMLHttpRequest
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (typeof url === 'string') {
          url = url.replace('localhost', targetIP).replace('127.0.0.1', targetIP);
        }
        return originalOpen.call(this, method, url, async, user, password);
      };
      
      true; // note: this is required, or you'll sometimes get silent failures
    })();
  `;

    const frontendUrl = `http://${config.localIP}:${config.frontendPort}`;

    // Handle hardware back button on Android to navigate within WebView
    React.useEffect(() => {
        const handleBackPress = () => {
            if (webViewRef.current) {
                webViewRef.current.goBack();
                return true; // Prevent default behavior (exiting the app)
            }
            return false; // Let default behavior happen
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Configure StatusBar to match the web app's style */}
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <WebView
                ref={webViewRef}
                source={{ uri: frontendUrl }}
                style={styles.webview}
                injectedJavaScriptBeforeContentLoaded={injectedScript}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                startInLoadingState={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4f46e5" />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Set base color to prevent flickering
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
