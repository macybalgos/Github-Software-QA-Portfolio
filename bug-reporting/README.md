
<h3> <b> Bug Reporting Overview </b> </h3>

This section of my QA portfolio showcases how I document and file software defects. Here, you can see a sample bug report that demonstrates my process for identifying, reproducing, and describing issues in a clear and actionable way. Each report includes full details such as steps to reproduce, expected vs. actual results, severity, screenshots, and environment information
<hr style="border: 0; border-top: 1px solid #ccc;">
<b> Bug Report: User Unable to Login </b>
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>Bug ID:</b> BR-001 <br>
<b>Title:</b> User is unable to log in using valid credentials

<b>Reported by:</b> Rosbel Garde <br>
<b>Date Reported:</b> October 10, 2025 <br>
<b>Module:</b> Login Page <br>
<b>Severity:</b> High <br>
<b>Priority:</b> P1 – Blocking user access <br>
<b>Environment:</b>
<ul>
<li> Application: Swag Labs Web </li>

<li>URL: https://www.saucedemo.com/</li>

<li> Browser: Google Chrome 141.0.0.0 (Windows 10)</li>

<li>Test Environment: UAT </li>
</ul>
<hr style="border: 0; border-top: 1px solid #ccc;">
<b> Description </b>

When a user attempts to log in using valid credentials (standard_user / secret_sauce), the system fails to redirect to the Inventory page and instead reloads the login screen without an error message.
<hr style="border: 0; border-top: 1px solid #ccc;">
<b> Steps to Reproduce </b>
<ol>
<li> Launch Chrome and navigate to https://www.saucedemo.com/. </li>

<li> Enter Username: standard_user. </li>

<li>Enter Password: secret_sauce. </li>

<li> Click on the Login button. </li>
</ol>

<b> Expected Result </b>

User should be successfully redirected to the Inventory page (/inventory.html) and see the “Products” title.

<b>  Actual Result </b>

The login page refreshes, no navigation occurs, and no error message is displayed.
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>  Screenshot / Evidence </b>

(Attach image or Allure screenshot here)
/bug-reporting/screenshots/BR-001-login-issue.png
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>  Root Cause </b>

Pending developer analysis. Possible session initialization or authentication API failure.
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>  Workaround </b>

None available — user cannot proceed without a successful login.
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>  Reproducibility </b>

100% – occurs on every attempt using valid credentials.
<hr style="border: 0; border-top: 1px solid #ccc;">
<b>  Additional Notes </b>
<ul>
<li>Tested with other accounts; issue consistent across all users. </li>

<li> Issue not reproducible in the Staging environment.</li>
</ul>
