# 8. Testing Documentation

## Testing Strategy
The testing strategy for Siit Coderelic focused on identifying and resolving issues at various layers of the application. Given the project's scope, a combination of **Manual Testing** and **Integration Testing** was employed to ensure a stable user experience.

## Types of Testing Used
1. **Manual Testing**: Systematically going through every feature as a user to find UI bugs and flow issues.
2. **Integration Testing**: Checking if the frontend and backend communicate correctly (e.g., verifying if a form submission actually saves data to MongoDB).
3. **Validation Testing**: Ensuring that invalid inputs (like empty emails or short passwords) are caught before being sent to the server.
4. **Responsive Testing**: Testing the application on different screen sizes (Mobile, Tablet, Desktop) using Chrome DevTools.

## Sample Test Cases

| Test Case ID | Feature | Action | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| TC-01 | Registration | Submit form with existing email | Show error "User already exists" | Error message displayed | PASSED |
| TC-02 | Login | Submit valid credentials | Redirect to Profile page | Redirected | PASSED |
| TC-03 | Publish Project | Upload image and fill details | Project appears in gallery | Image loaded and project displayed | PASSED |
| TC-04 | Search | Type keyword in search bar | Filtered project results show up | Results updated instantly | PASSED |
| TC-05 | Security | Access /profile without login | Redirect to login page | Redirected | PASSED |

## Validation Checks
The following validation rules are implemented:
- **Email**: Must follow a valid email format (example@domain.com).
- **Password**: Minimum length of 6 characters.
- **Project Title**: Required field, cannot be empty.
- **Images**: Only specific formats (JPG, PNG, WEBP) are accepted for upload via Cloudinary.

## Bug Handling Approach
1. **Identification**: Errors logged in the browser console or server terminal.
2. **Isolation**: Determining if the bug is in the Frontend logic or Backend API.
3. **Fixing**: Modifying the code and verifying the fix locally.
4. **Re-testing**: Running the specific test case again to ensure no regressions.

## Tools Used for Testing
- **Chrome DevTools**: For inspecting the layout, monitoring network requests, and debugging JavaScript.
- **Postman**: For testing API endpoints independently of the frontend.
- **MongoDB Compass**: To verify that data is correctly stored and updated in the database.
