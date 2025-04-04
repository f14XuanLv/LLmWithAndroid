document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    hljs.highlightAll();
    
    // Set last updated date
    const lastUpdated = document.getElementById('lastUpdated');
    const currentDate = new Date();
    lastUpdated.textContent = currentDate.toLocaleDateString();
    
    // Toggle Table of Contents on mobile
    const tocButton = document.getElementById('toggleToc');
    const tocContent = document.querySelector('.toc-content');
    
    // Only collapse TOC by default on mobile
    if (window.innerWidth < 992) {
        tocContent.classList.add('collapsed');
        tocButton.textContent = '展开';
    }
    
    tocButton.addEventListener('click', function() {
        tocContent.classList.toggle('collapsed');
        tocButton.textContent = tocContent.classList.contains('collapsed') ? '展开' : '收起';
    });
    
    // Handle copy buttons for code blocks
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetIndex = button.getAttribute('data-target');
            const codeBlock = document.querySelectorAll('pre code')[targetIndex];
            const codeText = codeBlock.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(function() {
                // Visual feedback
                button.classList.add('copied');
                button.textContent = '已复制';
                
                // Reset after 2 seconds
                setTimeout(function() {
                    button.classList.remove('copied');
                    button.textContent = '复制';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy text: ', err);
                button.textContent = '复制失败';
                
                setTimeout(function() {
                    button.textContent = '复制';
                }, 2000);
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading the page
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Highlight active section in TOC based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.toc-content a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.fontWeight = link.getAttribute('href') === current ? 'bold' : 'normal';
        });
    });
});