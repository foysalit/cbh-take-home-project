# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### Assumptions
- The team working on these tickets are cross-functional and are able to handle BE/FE tasks internally without having to delegate tasks outside of the team
- The project is using SQL database
- Teams are familiar with relative estimation and uses t-shirt sizes as estimation unit where the units loosely translate to XS - ~1/2 day, S - 1-2 days, M - 2-4 days, L - 1 week
- Design/mockups are provided and provided to be attached with each ticket (where applicable)

#### Ticket 1: Agents table migration
*Description*: Create a migration that adds a new column `custom_agent_id` to the Agents table that 
- can store alphanumeric string 
- defaults to `NULL`
- is unique per facility per agent and ensures that no two `custom_agent_id` is same within the same facility but can be same across facilities. 

*Acceptance Criteria*: 
- Migration must run without error in production environment. 
- Use anonymized production dataset to test locally if possible.

*Estimate*: XS

#### Ticket 2: Add custom agent id input in all forms where agent info can be created/modified
*Description*: Go through all forms that allow creating/updating agent info and add a `Custom Agent Id` input field so that
- When editing, existing custom agent id is displayed in the field (if exists)
- When creating or editing, custom agent id input is validated and error messages are shown for
  - Duplicates
  - Character encoding, to ensure only alphanumeric characters are allowed
- When editing, if a custom agent id existed before but is being cleared, show a warning asking for confirmation from the user

*Acceptance Criteria*: 
- New agents can be created with or without custom agent id
- Existing agents can be updated with new custom agent id
- Existing custom agent id can be removed after double confirmation from user
- Informative error message is displayed when duplicate or non-alphanumeric character is inserted in the field

*Estimate*: S

#### Ticket 3: Display custom agent id in the UI and in reports along with other agent info
*Description*: 
- Find all the api responses where agent info is included and add the `custom_agent_id` column to the response.
- Go through all places in the UI and all reports where agent info is displayed and display `custom_agen_id` along with the info appropriately.
- Add a `copy to clipboard` button next to `custom_agent_id`display in the UI to allow easily copying the ids  

*Acceptance Criteria*:
- In lists/tables or other places where agent info is displayed, custom agent id is also visible
- In all exported/generated reports, custom agent id is visible

*Estimate*: S