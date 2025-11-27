// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const scrollProgressBar = document.querySelector('.scroll-progress span');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const filterButtons = document.querySelectorAll('.filter-btn');

if (hamburger && navMenu) {
    const toggleMenu = () => navMenu.classList.toggle('active');

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const updateActiveSection = () => {
    let currentId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            currentId = section.id;
        }
    });

    if (currentId) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }
};

const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (navbar) {
        navbar.classList.toggle('is-scrolled', scrollY > 50);
    }
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
    }
    if (backToTopBtn) {
        if (scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    updateActiveSection();
};

window.addEventListener('scroll', handleScroll);
handleScroll();

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Book Modal
const bookModal = document.getElementById('bookModal');
const bookCards = document.querySelectorAll('.book-card');

// Check if modal exists
if (!bookModal) {
    console.error('Book modal not found!');
}

const bookModalClose = bookModal ? bookModal.querySelector('.modal-close') : null;
const modalCoverImg = bookModal ? bookModal.querySelector('.modal-cover') : null;
const modalCoverIcon = bookModal ? bookModal.querySelector('.modal-image i') : null;

const bookData = {
    1: {
        title: 'Kasur dan Kebenaran',
        badge: 'Puisi',
        author: 'Chindy Saifani',
        year: '2024',
        pages: '110',
        rating: '4.8',
        synopsis: 'Apakah Anda merasa hidup terlalu penuh dengan tekanan dan masalah? Ketika masalah menyerang, kadang-kadang satu-satunya hal yang dapat kita lakukan adalah beristirahat dan meresapi kenyataan. Namun, apakah Anda tahu bahwa kasur yang Anda tiduri setiap malam dapat memberikan pengaruh besar pada hidup Anda?',
        description: 'Dengan gaya bahasa yang puitis dan alur cerita yang memikat, novel ini telah menyentuh hati ribuan pembaca di seluruh Indonesia. Kisah tentang pencarian jati diri dan makna hidup yang dikemas dalam narasi yang indah.',
        cover: 'images/books/buku (1).jpeg',
        highlights: [
            'Pemenang Penghargaan Sastra 2024',
            'Best Seller Nasional',
            'Diterjemahkan ke 3 bahasa'
        ]
    },
    2: {
        title: 'Diorama Hati',
        badge: 'Senandika',
        author: 'Chindy Saifani',
        year: '2020',
        pages: '250',
        rating: '4.9',
        synopsis: 'Panduan praktis untuk pengembangan diri melalui literasi dan pembelajaran berkelanjutan. Buku ini memberikan tips dan teknik menulis yang efektif untuk pemula hingga profesional.',
        description: 'Berisi kumpulan pengalaman dan pembelajaran dari perjalanan menulis selama bertahun-tahun. Cocok untuk siapa saja yang ingin mengembangkan kemampuan menulis mereka.',
        cover: 'images/books/buku (2).jpeg',
        highlights: [
            'Panduan lengkap teknik menulis',
            'Dilengkapi latihan praktis',
            'Rekomendasi dari penulis ternama'
        ]
    },
    3: {
        title: 'All About Us',
        badge: 'Cerpen',
        author: 'Chindy Saifani',
        year: '2021',
        pages: '180',
        rating: '4.7',
        synopsis: 'Kumpulan puisi yang mengeksplorasi keindahan bahasa dan kedalaman emosi manusia. Setiap bait mengajak pembaca untuk merasakan dan merenungkan kehidupan.',
        description: 'Puisi-puisi dalam buku ini lahir dari pengamatan mendalam terhadap kehidupan sehari-hari, cinta, kehilangan, dan harapan. Ditulis dengan bahasa yang indah dan penuh makna.',
        cover: 'images/books/buku (3).jpeg',
        highlights: [
            '50+ puisi pilihan',
            'Tema beragam dan universal',
            'Ilustrasi eksklusif'
        ]
    },
    4: {
        title: 'Secerah Cahaya Ramadhan',
        badge: 'Cerpen',
        author: 'Chindy Saifani',
        year: '2022',
        pages: '290',
        rating: '4.6',
        synopsis: 'Kumpulan cerpen yang menggambarkan kehidupan urban dengan segala dinamikanya. Setiap cerita menawarkan perspektif unik tentang kehidupan di kota besar.',
        description: 'Antologi ini berisi 15 cerpen yang mengangkat tema kehidupan urban, hubungan antar manusia, dan pencarian makna di tengah hiruk pikuk kota. Ditulis dengan gaya yang segar dan relatable.',
        cover: 'images/books/buku (4).jpeg',
        highlights: [
            '15 cerpen pilihan',
            'Tema kehidupan urban',
            'Karakter yang relatable'
        ]
    },
    5: {
        title: 'Mata Mata Pengagum',
        badge: 'Cerpen',
        author: 'Chindy Saifani',
        year: '2021',
        pages: '210',
        rating: '4.7',
        synopsis: 'Novel coming-of-age yang menggambarkan perjalanan seorang penulis muda menemukan suaranya sendiri di tengah dinamika kehidupan kampus.',
        description: 'Menggabungkan unsur romansa, persahabatan, dan mimpi, buku ini menghadirkan narasi yang hangat dan inspiratif tentang keberanian mengejar passion.',
        highlights: [
            'Ditulis selama residensi literasi',
            'Masuk nominasi Anugerah Buku Indie 2022',
            'Menyertakan catatan proses kreatif'
        ],
        cover: 'images/books/buku (5).jpeg'
    }
};

if (filterButtons.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetFilter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            bookCards.forEach(card => {
                const genre = card.dataset.genre;
                const shouldShow = targetFilter === 'all' || genre === targetFilter;
                card.classList.toggle('hide', !shouldShow);
            });
        });
    });
}

bookCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent if clicking on button
        if (e.target.closest('.view-btn')) {
            e.stopPropagation();
        }
        
        const bookId = card.getAttribute('data-book');
        const book = bookData[bookId];
        const coverSrc = card.dataset.cover || (book ? book.cover : '');
        
        console.log('Book clicked:', bookId, book);
        
        if (book && bookModal) {
            bookModal.querySelector('.modal-badge').textContent = book.badge;
            bookModal.querySelector('.modal-title').textContent = book.title;
            bookModal.querySelector('.modal-author').textContent = `Oleh: ${book.author}`;
            bookModal.querySelector('.modal-meta').innerHTML = `
                <span><i class="fas fa-calendar"></i> ${book.year}</span>
                <span><i class="fas fa-file-alt"></i> ${book.pages} halaman</span>
                <span><i class="fas fa-star"></i> ${book.rating}/5</span>
            `;
            bookModal.querySelector('.modal-description').innerHTML = `
                <h3>Sinopsis</h3>
                <p>${book.synopsis}</p>
                <p>${book.description}</p>
            `;
            bookModal.querySelector('.modal-highlights ul').innerHTML = book.highlights
                .map(h => `<li><i class="fas fa-check"></i> ${h}</li>`)
                .join('');
            if (modalCoverImg) {
                const showIcon = () => {
                    modalCoverImg.style.display = 'none';
                    if (modalCoverIcon) {
                        modalCoverIcon.style.display = 'flex';
                        modalCoverIcon.style.opacity = '1';
                    }
                };
                const showCover = () => {
                    modalCoverImg.style.display = 'block';
                    if (modalCoverIcon) {
                        modalCoverIcon.style.display = 'none';
                        modalCoverIcon.style.opacity = '0';
                    }
                };

                modalCoverImg.style.display = 'none';
                if (coverSrc) {
                    modalCoverImg.onload = showCover;
                    modalCoverImg.onerror = showIcon;
                    modalCoverImg.src = coverSrc;
                    modalCoverImg.alt = `Cover ${book.title}`;
                } else {
                    showIcon();
                }
            }
            
            bookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (bookModalClose) {
    bookModalClose.addEventListener('click', () => {
        bookModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (bookModal) {
    bookModal.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            bookModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Article Modal
const articleModal = document.getElementById('articleModal');
const articleCards = document.querySelectorAll('.article-card');

// Check if modal exists
if (!articleModal) {
    console.error('Article modal not found!');
}

const articleModalClose = articleModal ? articleModal.querySelector('.modal-close') : null;

const articleData = {
    1: {
        title: 'Pentingnya Literasi di Era Digital',
        badge: 'Literasi Digital',
        author: 'Chindy Saifani',
        date: '22 November 2025',
        readTime: '5 menit',
        content: `
            <p>Di era digital yang serba cepat ini, kemampuan literasi bukan hanya tentang membaca dan menulis. Literasi digital mencakup kemampuan untuk memahami, menganalisis, dan menggunakan informasi dari berbagai sumber digital dengan bijak.</p>
            
            <h3>Mengapa Literasi Digital Penting?</h3>
            <p>Dengan banjirnya informasi di internet, kemampuan untuk memilah informasi yang valid dan hoaks menjadi sangat krusial. Literasi digital membantu kita untuk:</p>
            <ul>
                <li>Mengidentifikasi sumber informasi yang kredibel</li>
                <li>Berpikir kritis terhadap konten yang kita konsumsi</li>
                <li>Berkomunikasi secara efektif di platform digital</li>
                <li>Melindungi privasi dan keamanan data pribadi</li>
            </ul>

            <h3>Tantangan di Era Digital</h3>
            <p>Generasi muda saat ini tumbuh dengan teknologi, namun tidak semua memiliki literasi digital yang memadai. Banyak yang mahir menggunakan media sosial, tetapi kurang dalam hal memverifikasi informasi atau memahami dampak jangka panjang dari jejak digital mereka.</p>

            <h3>Langkah Meningkatkan Literasi Digital</h3>
            <p>Pendidikan literasi digital harus dimulai sejak dini. Sekolah, keluarga, dan masyarakat perlu berkolaborasi untuk menciptakan ekosistem pembelajaran yang mendukung pengembangan kemampuan literasi digital yang komprehensif.</p>
        `,
        tags: ['#LiterasiDigital', '#Pendidikan', '#Teknologi']
    },
    2: {
        title: 'Teknik Menulis Kreatif untuk Pemula',
        badge: 'Tips Menulis',
        author: 'Chindy Saifani',
        date: '15 November 2025',
        readTime: '7 menit',
        content: `
            <p>Menulis kreatif adalah seni mengekspresikan ide, emosi, dan imajinasi melalui kata-kata. Bagi pemula, memulai perjalanan menulis bisa terasa menakutkan, namun dengan teknik yang tepat, siapa pun bisa menjadi penulis yang baik.</p>
            
            <h3>1. Mulai dengan Freewriting</h3>
            <p>Freewriting adalah teknik menulis tanpa berhenti selama periode waktu tertentu. Jangan khawatir tentang grammar atau struktur, biarkan ide mengalir bebas. Teknik ini membantu mengatasi writer's block dan menemukan ide-ide baru.</p>

            <h3>2. Baca Sebanyak Mungkin</h3>
            <p>Penulis yang baik adalah pembaca yang rakus. Membaca berbagai genre dan gaya penulisan akan memperkaya kosakata dan memberikan inspirasi untuk karya Anda sendiri.</p>

            <h3>3. Tulis Setiap Hari</h3>
            <p>Konsistensi adalah kunci. Luangkan waktu setiap hari untuk menulis, meskipun hanya 15-30 menit. Kebiasaan ini akan meningkatkan kemampuan menulis Anda secara signifikan.</p>

            <h3>4. Bergabung dengan Komunitas Penulis</h3>
            <p>Komunitas penulis memberikan dukungan, feedback, dan motivasi. Berbagi karya dengan sesama penulis membantu Anda melihat perspektif baru dan terus berkembang.</p>
        `,
        tags: ['#MenulisKreatif', '#TipsMenulis', '#Pemula']
    },
    3: {
        title: 'Sastra Indonesia Kontemporer',
        badge: 'Analisis Sastra',
        author: 'Chindy Saifani',
        date: '8 November 2025',
        readTime: '10 menit',
        content: `
            <p>Sastra Indonesia kontemporer menunjukkan perkembangan yang sangat dinamis dalam beberapa dekade terakhir. Karya-karya penulis Indonesia modern tidak hanya populer di dalam negeri, tetapi juga mulai mendapat pengakuan internasional.</p>
            
            <h3>Karakteristik Sastra Kontemporer</h3>
            <p>Sastra Indonesia kontemporer ditandai dengan beberapa karakteristik unik:</p>
            <ul>
                <li>Eksplorasi tema-tema urban dan kehidupan modern</li>
                <li>Penggunaan bahasa yang lebih bebas dan eksperimental</li>
                <li>Pengaruh budaya pop dan media digital</li>
                <li>Keberagaman perspektif dan latar belakang penulis</li>
            </ul>

            <h3>Penulis-Penulis Terkemuka</h3>
            <p>Generasi penulis kontemporer Indonesia menghadirkan karya-karya yang segar dan berani. Mereka tidak takut mengangkat isu-isu sensitif dan mengeksplorasi bentuk-bentuk naratif baru.</p>

            <h3>Masa Depan Sastra Indonesia</h3>
            <p>Dengan semakin mudahnya akses ke platform digital dan self-publishing, masa depan sastra Indonesia terlihat cerah. Semakin banyak suara baru yang muncul, membawa perspektif dan cerita yang beragam.</p>
        `,
        tags: ['#SastraIndonesia', '#Kontemporer', '#Analisis']
    }
};

articleCards.forEach(card => {
    const readMoreBtn = card.querySelector('.read-more');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const articleId = card.getAttribute('data-article');
            const article = articleData[articleId];
            
            console.log('Article clicked:', articleId, article);
            
            if (article && articleModal) {
                articleModal.querySelector('.modal-badge').textContent = article.badge;
                articleModal.querySelector('.modal-title').textContent = article.title;
                articleModal.querySelector('.article-modal-meta').innerHTML = `
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                    <span><i class="fas fa-calendar"></i> ${article.date}</span>
                    <span><i class="fas fa-clock"></i> ${article.readTime} baca</span>
                `;
                articleModal.querySelector('.article-modal-content').innerHTML = article.content;
                articleModal.querySelector('.article-tags').innerHTML = article.tags
                    .map(tag => `<span class="tag">${tag}</span>`)
                    .join('');
                
                articleModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
});

if (articleModalClose) {
    articleModalClose.addEventListener('click', () => {
        articleModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (articleModal) {
    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Pesan Terkirim!</span>';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.book-card, .article-card, .skill-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard Navigation for Modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (bookModal.classList.contains('active')) {
            bookModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (articleModal.classList.contains('active')) {
            articleModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});


// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Achievement Counter Animation
const achievementItems = document.querySelectorAll('.achievement-item h4');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + text.replace(/[0-9]/g, '');
                    }
                }, 30);
            }
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

achievementItems.forEach(item => {
    counterObserver.observe(item);
});
