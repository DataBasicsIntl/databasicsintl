# DataBasicsIntl.com

Static website for Data Basics International, Inc. (DataBasicsIntl.com), hosted on GitHub Pages. Separate from the WebSecretaries.com site (repo DataBasicsIntl/websecretaries).

- Pages: index, about, services, contact, thanks, privacy, cookies, 404
- Old Website Builder URLs: the extensionless about and contact paths resolve to the .html pages automatically; `our-services/` redirects to services.html
- The contact form posts to `https://forms.databasicsintl.com/send.php`, a PHP handler on HostGator. Its source is in `_server/forms/` (not published by GitHub Pages). It emails messages, with attachments, to info@DataBasicsIntl.com.
- Bump the `?v=` on the css/js links whenever styles or scripts change.
- Preview locally from the parent folder: `powershell -ExecutionPolicy Bypass -File tools\serve.ps1 -Root databasicsintl -Port 8081`
