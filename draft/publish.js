console.log("Load start publish.js");

/**************************************
  Disable default favicon and insert custom one
*************************************/
document.querySelector("head > link[rel=icon]").href =
  "https://publish-01.obsidian.md/access/35d05cd1bf5cc500e11cc8ba57daaf88/favicon.ico";


/****************************************
Show Date and Time for Creation/Updating
****************************************/
let id;

function insertMetaData() {
  // Check if app and site cache is available yet
  if (!app || !app.site || !app.site.cache || !app.currentFilepath || !app.site.cache.cache[app.currentFilepath]) {
    console.log("App data not yet available, waiting...");
    return;
  }

  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    console.log("No frontmatter found");
    clearInterval(id);
    return;
  }

  const created = frontmatter["created"]?.replaceAll("-", "/");
  const updated = frontmatter["updated"]?.replaceAll("-", "/");
  const status = frontmatter["status"];
  const url = frontmatter["url"];
  if (!(created || updated || status || url)) {
    console.log("No metadata to display");
    clearInterval(id);
    return;
  }

  // Check if we've already inserted our container to avoid duplicates
  if (document.querySelector(".properties-container")) {
    console.log("Properties container already exists");
    clearInterval(id);
    return;
  }

  // Try both potential insertion points
  const frontmatterEl = document.querySelector(".frontmatter");
  const pageHeaderEl = document.querySelector(".page-header");
  
  if (!frontmatterEl && !pageHeaderEl) {
    // DOM not ready yet, try again on next interval
    console.log("Insertion points not found yet");
    return;
  }

  // Choose insertion point (prefer frontmatter)
  const insertionPoint = frontmatterEl || pageHeaderEl;
  
  const urlElement = url ? `<a href="${url}" class="url">Test URL</a>` : "";

  insertionPoint.insertAdjacentHTML(
    "afterend",
    `
<div class="properties-container">
  <div class="properties">
    ${created ? '<div class="created">created: ' + created + "</div>" : ""}
    ${updated ? '<div class="updated">updated: ' + updated + "</div>" : ""}
    ${status ? '<div class="status">' + status + "</div>" : ""}
  </div>
  <div class="properties">
    ${urlElement}
  </div>
</div>
`,
  );

  console.log("Metadata insertion successful");
  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes.length > 0
    ) {
      // Check if page header or frontmatter was added
      for (let node of mutation.addedNodes) {
        if (node.nodeType === 1) { // Element node
          if (node.className === "page-header" || 
              node.querySelector?.(".frontmatter") || 
              node.className === "frontmatter") {
            console.log("Page content changed, resetting metadata insertion");
            clearInterval(id);
            id = setInterval(insertMetaData, 50);
            break;
          }
        }
      }
    }
  }
};

// Start early metadata insertion attempts when document structure is available
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded fired, starting metadata insertion");
  clearInterval(id);
  id = setInterval(insertMetaData, 50);
});

// Also start when app object might be available
if (document.readyState !== 'loading') {
  console.log("Document already loaded, starting metadata insertion");
  clearInterval(id);
  id = setInterval(insertMetaData, 50);
}

// Set up observer for content changes
const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section",
);

if (targetNode) {
  const observer = new MutationObserver(onChangeDOM);
  observer.observe(targetNode, { childList: true, subtree: true });
  console.log("Observer attached to markdown preview section");
} else {
  // Try again shortly if the target node isn't available yet
  setTimeout(() => {
    const retryNode = document.querySelector(".markdown-preview-sizer.markdown-preview-section");
    if (retryNode) {
      const observer = new MutationObserver(onChangeDOM);
      observer.observe(retryNode, { childList: true, subtree: true });
      console.log("Observer attached to markdown preview section (delayed)");
    }
  }, 100);
}

// Initial metadata insertion attempt
id = setInterval(insertMetaData, 50);



/*********************************
  Switches the custom theme to DND
*********************************/
document.body.addClass('dnd');


/*********************************
Hide 'Obsidian Promos' on site
**********************************/

function setupGraphSettings() {
    if (app && app.graph && app.graph.renderer) {
        app.graph.renderer.hidePowerTag = true;
        console.log('Graph settings successfully applied.');
    } else {
        console.log('Graph renderer still not available, retrying in 10ms...');
        setTimeout(setupGraphSettings, 10); // Retry after 10ms
    }
}

// Initial call to setupGraphSettings
setupGraphSettings();

/*********************************
    CHANGE FILE NAME VIEW TO TITLES

function pwReplaceTitles() {
    
    const pageHeader = document.getElementsByClassName("page-header")[0];
    const titleProperty = app.site.cache.cache[app.currentFilepath].frontmatter["title"];
    const doNotUseTitle = document.getElementsByClassName("pws-title-noproperty")[0];
    const firstHeading = document.querySelectorAll(".pws-title-promote-h1 h1")[0];
    
    if (firstHeading) {
        document.title = firstHeading.innerText;
        pageHeader.innerText = firstHeading.innerText;
        firstHeading.style.display = 'none';
    } else if (titleProperty && !doNotUseTitle) {
        document.title = titleProperty;
        pageHeader.innerText = titleProperty;
    }
    
}
**********************************/

/*********************************
    UPDATE TREE ITEM DISPLAY TEXT
**********************************/
// Wait for nav view to be available
function waitForNavView(callback) {
    const navView = document.querySelector('.site-body-left-column .nav-view');
    if (navView) {
        console.log('Nav view found');
        callback();
    } else {
        console.log('Nav view not found, retrying...');
        setTimeout(() => waitForNavView(callback), 100);
    }
}

function pwUpdateTreeItemTitles() {
    console.log('pwUpdateTreeItemTitles called');
    const navView = document.querySelector('.site-body-left-column .nav-view');
    if (!navView) {
        console.log('Nav view not available');
        return;
    }

    // Find all visible tree items within the nav view
    // This gets items that aren't in a collapsed folder
    const visibleItems = navView.querySelectorAll('.tree-item:not(.is-collapsed) > .tree-item-self');
    console.log('Found visible items:', visibleItems.length);
    
    visibleItems.forEach(item => {
        // Skip if we've already processed this item
        if (item.hasAttribute('data-title-processed')) return;
        
        // Get the file path from data-path attribute
        const filePath = item.getAttribute('data-path');
        if (!filePath) return;
        
        // Skip if this is a folder (no .md extension)
        if (!filePath.endsWith('.md')) return;
        
        // Log for debugging
        console.log('Processing file:', filePath);
        
        // Get the file's frontmatter from cache
        const fileCache = app.site.cache.cache[filePath];
        if (!fileCache?.frontmatter) {
            console.log('No frontmatter found for:', filePath);
            return;
        }
        
        // Find the inner element that contains the text
        const innerEl = item.querySelector('.tree-item-inner');
        if (!innerEl) return;
        
        // Use title from frontmatter if available, otherwise keep existing text
        const title = fileCache.frontmatter.title;
        if (title) {
            console.log('Updating title for', filePath, 'to:', title);
            innerEl.textContent = title;
            // Mark parent as processed to avoid reprocessing
            item.setAttribute('data-title-processed', 'true');
        }
    });
}

// Create observer for nav view content and folder state changes
const navViewObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Check if nodes were added or class changes occurred
        if (mutation.addedNodes.length || 
            (mutation.type === 'attributes' && mutation.attributeName === 'class')) {
            console.log('Nav view content or folder state updated');
            pwUpdateTreeItemTitles();
        }
    });
});

// Start observing once nav view is available
function setupNavViewObserver() {
    waitForNavView(() => {
        const navView = document.querySelector('.site-body-left-column .nav-view');
        console.log('Setting up nav view observer');
        navViewObserver.observe(navView, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']  // Only watch for class changes
        });
        // Run initial update
        pwUpdateTreeItemTitles();
    });
}

// Initialize when the document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavViewObserver);
} else {
    setupNavViewObserver();
}

// Ensure we run after any dynamic content loads
window.addEventListener('load', () => {
    console.log('Window loaded, ensuring observer is setup');
    setupNavViewObserver();
    // Also try metadata insertion one more time
    if (!document.querySelector(".properties-container")) {
        console.log("Window loaded but no properties container found, trying once more");
        clearInterval(id);
        id = setInterval(insertMetaData, 50);
    }
});

/****************
 Page Nav Observer
****************/

const pageNavObserverConfig  = { childList:true, subtree: true }
const pageNavObserverNode = document.getElementsByClassName("markdown-preview-section")[0];

function pwNavFunctions() {
    pwReplaceTitles();
    pwToggleGraphView();
    pwUpdateTreeItemTitles(); // Try updating titles during navigation
}

function pwNavCallback(mutationRecords, observer) {
    for(let mutationRecord of mutationRecords) { // each mutation in event
        for(let addedNode of mutationRecord.addedNodes) { // each node in mutation
            if(addedNode.firstChild?.classList?.contains("frontmatter")) { // To catch internal page nav
                //console.log("<================== FIRED");
                pwNavFunctions(); // Immediate execution for internal page nav
                setTimeout(pwNavFunctions, 550); // Delayed execution for new page / refreshes
                
                // Also try metadata insertion
                clearInterval(id);
                id = setInterval(insertMetaData, 50);
            }
        }
    }
}

let pageNavObserver = new MutationObserver(pwNavCallback);
pageNavObserver.observe(pageNavObserverNode, pageNavObserverConfig);









function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    clearInterval(id);
    return;
  }

  const tags = frontmatter["tags"];
  if (!tags) {
    clearInterval(id);
    return;
  }

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    return;
  }

  const tagElms = tags
    .map(
      (tag) => `
    <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
    `
    )
    .join("");
  frontmatterEl.insertAdjacentHTML(
    "afterend",
    `
<div class="properties">
    ${tagElms}
</div>
`
  );

  clearInterval(id);
}







/* TAG ELEMENT DISPLAY
let id;

function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    return;
  }

  const tags = frontmatter["tags"];
  if (!tags) {
    return;
  }

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    return;
  }

  const tagElms = tags
    .map(
      (tag) => `
    <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
    `
    )
    .join("");
    frontmatterEl.insertAdjacentHTML(
        "afterend",
        `
    <div style="display: flex-wrap; margin: 3px; gap: 3px;">
      ${tagElms}
    </div> 
`
  );

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaDates, 50);
    }
  }
};

const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section"
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);


 <div style="display: flex-wrap; gap: 3px;">
  ${tagElms}
</div> */ 