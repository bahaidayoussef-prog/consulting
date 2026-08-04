Invoke the `blog-enrich` skill.

Add images, ::stat:: blocks, > callouts, tables, and improved prose to an existing article.

**Input:** $ARGUMENTS (filename, article number, or article title)

**Steps:**
1. Load the blog-enrich skill for all enrichment rules
2. Read the specified article from public/blog/
3. Identify what's missing (no image? no stats? weak hook? no callouts?)
4. Propose enrichments with specific placement
5. Apply them directly via Edit tool
6. Confirm changes made

**Always add (if missing):**
- `image:` in frontmatter → pick best match from /images/ using the topic-image table
- Lead image `![alt](/images/xxx.jpg)` after first paragraph
- At least 1 `::stat::` block with a real number from the article
- At least 1 `> callout` block with Youssef's expert voice
- Tables for any comparative data presented in prose

**Do NOT:**
- Change article structure or section order
- Rewrite paragraphs (unless the hook is clearly weak)
- Add images where there's no natural breakpoint
