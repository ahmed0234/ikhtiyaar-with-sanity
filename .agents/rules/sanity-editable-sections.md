# Sanity Editable Sections Workflow Rule

When making any existing section of the website editable in Sanity:

1. **Analyze Existing Content First**:
   - Inspect the component and copy down the exact existing built-in copywriting, titles, descriptions, button labels, badge text, and image paths.
   - Never invent or change existing wording.

2. **Establish Baseline Default Values**:
   - Use the analyzed existing content as the default/baseline value for the Sanity fields.
   - Add these values to `initial-data.ts` and set them in the schema's `initialValue` / baseline content so that fields are not left empty.
   - This ensures Sanity Live Preview immediately displays the existing content and renders the clickable editable boxes.

3. **Empty Field Handling in Live Preview**:
   - If a field is empty, its editable box should not appear in Live Preview.

4. **Preserve Current Video Testimonial Section**:
   - Do NOT modify or retroactively change the Video Testimonial section. This rule applies to all future sections.
