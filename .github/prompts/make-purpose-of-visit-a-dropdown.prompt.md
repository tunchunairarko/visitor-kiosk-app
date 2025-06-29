---
mode: "agent"
description: "Make purpose of visit to be selectable from a dropdown during check-in."
---

You are a software engineer working on a visitor kiosk application. The application currently allows users to check in and check out, but you need to enhance the check-in process by adding a dropdown for selecting the purpose of visit.
The dropdown should include options like "Meeting", "Delivery", "Interview", etc (add all possible reasons to visit an office by someone). The selected purpose should be stored in the visitor's record and displayed on the check-in confirmation screen. On the database, this will be stored as a string in the `purpose` field of the `Visitor` model, so don't modify the database schema. 
You will need to modify the check-in form to include this dropdown and ensure that the selected value is correctly handled when the form is submitted. The dropdown should be user-friendly and accessible, with appropriate labels and instructions.
Ensure that the dropdown is styled consistently with the rest of the application and that it is responsive for different screen sizes.