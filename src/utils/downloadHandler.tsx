// pages/api/generate-cv.js
import puppeteer from 'puppeteer';
import { renderToStaticMarkup } from 'react-dom/server';
import Sample3 from '@/components/pages/exampleCv/Sample3';

export default async function handler(req: any, res: any) {
  try {
    const { cvData, format = 'png' } = req.body;
    
    if (!cvData) {
      return res.status(400).json({ error: 'CV data is required' });
    }
    
    // Render your React component to HTML string
    const componentHTML = renderToStaticMarkup(
      <Sample3
        data={cvData}
        scale="xl"
        size="lg"
        textSize="xl"
        iconSize="xl"
        variantText="body"
        sidebarWidth={32}
        printable="print"
        primaryColor={'#FFFFFF'}
        sidebarColor={'#8B8EBC'}
        skillColor={'#262424'}
        className="bg-white shadow-none"
        childrenClassName="max-h-none"
      />
    );
    
    // Create complete HTML document
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CV</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 20px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              body { padding: 0; margin: 0; }
              * { -webkit-print-color-adjust: exact !important; }
            }
            /* Ensure colors are preserved */
            .bg-\\[\\#8B8EBC\\] { background-color: #8B8EBC !important; }
            .bg-\\[\\#262424\\] { background-color: #262424 !important; }
            .text-white { color: white !important; }
            /* Add any other custom styles here */
          </style>
        </head>
        <body>
          <div style="width: 210mm; min-height: 297mm; margin: 0 auto;">
            ${componentHTML}
          </div>
        </body>
      </html>
    `;
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set HTML content directly
    await page.setContent(fullHTML, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    if (format === 'pdf') {
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        }
      });
      
      await browser.close();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
      res.send(pdf);
      
    } else {
      // PNG generation
      await page.setViewport({
        width: 794,  // A4 width at 96 DPI
        height: 1123, // A4 height at 96 DPI
        deviceScaleFactor: 2 // For high quality
      });
      
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: true,
        omitBackground: false
      });
      
      await browser.close();
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'attachment; filename=cv.png');
      res.send(screenshot);
    }
    
  } catch (error: any) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate file',
      details: error.message 
    });
  }
}