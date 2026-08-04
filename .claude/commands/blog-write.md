Invoke the `blog-write` skill.

Write a complete, publication-ready blog article for the Essor Consulting site.

**Input:** $ARGUMENTS (topic, keyword, or brief description)

**Steps:**
1. Load the blog-write skill for all writing rules, image mapping, and voice guidelines
2. Identify the primary keyword and cluster from the topic
3. Draft the complete markdown file with:
   - Frontmatter (title, date, author, image, keywords, description)
   - Strong hook (specific Moroccan stat or paradox)
   - Lead image from /images/
   - 4-6 H2 sections with H3 subsections
   - 1-3 ::stat:: blocks
   - 1-2 > callout blocks
   - At least 1 table if comparing data
   - CTA section
   - Conclusion
4. State the filename and the line to add in Blog.tsx blogFiles array
5. Offer to save the file and update Blog.tsx

**Quality check before delivering:**
- [ ] Primary keyword in title, first 100 words, and 2+ headings
- [ ] At least 800 words
- [ ] At least 1 image, 1 ::stat::, 1 > callout
- [ ] CTA with contact info
- [ ] Author: "Youssef BAHAIDA"
- [ ] Date: today's date
