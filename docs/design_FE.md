# Frontend Design

## Structure

- `src/main/resources/static/index.html`: single page shell and modal form.
- `app.js`: fetch calls, rendering, validation, debounce and actions.
- `styles.css`: responsive layout, six-field filter grid and modal.

## List and search

- Display six columns: employee code, full name, gender, date of birth, phone and email.
- Six filter controls match those columns.
- Text input search uses 300ms debounce; gender/date use change event.
- Search query state is represented by URL parameters.
- Clear filters resets all six controls and reloads the default list.
- Render user/API values with `textContent`.

## Modal CRUD

- Add Employee opens modal.
- Edit opens the same modal populated from GET detail.
- Employee code and full name have required validation.
- On submit, disable Save until request completes.
- On success, close modal, show message and refresh list.
- Close works with button, overlay click and Escape.

## Export and responsive behavior

- Export CSV uses current six search parameters.
- Filter grid is six columns on desktop, three on tablet and two on mobile.
- Table scrolls horizontally on narrow screens.
