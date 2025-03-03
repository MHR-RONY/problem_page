document.addEventListener('DOMContentLoaded', () => {
    const ratingButtons = document.querySelectorAll('.rating-btn');

    ratingButtons.forEach(button => {
        button.addEventListener('click', () => {
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Selected rating: ${button.textContent.trim()}`);
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300);
            updateProblemsList(button.textContent.trim());
        });
    });

    function updateProblemsList(rating) {
        const tableRows = document.querySelectorAll('.problems-table-row');

        tableRows.forEach(row => {
            row.style.opacity = '0.5';
        });

        setTimeout(() => {
            tableRows.forEach(row => {
                row.style.opacity = '1';
            });

            const progressFraction = document.querySelector('.progress-card:first-child .progress-fraction');
            const progressPercentage = document.querySelector('.progress-card:first-child .progress-percentage');
            const progressCircle = document.querySelector('.progress-card:first-child circle:nth-child(2)');

            let solved = 0;
            let total = 31;

            if (parseInt(rating) < 1100) {
                solved = Math.floor(Math.random() * 10);
            } else if (parseInt(rating) < 1500) {
                solved = Math.floor(Math.random() * 5);
            } else {
                solved = 0;
            }

            const percentage = Math.round((solved / total) * 100);
            progressFraction.textContent = `${solved}/${total}`;
            progressPercentage.textContent = `${percentage}%`;

            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            progressCircle.style.strokeDashoffset = offset;

            const progressCard = document.querySelector('.progress-card:first-child');
            progressCard.style.transform = 'translateY(-5px)';
            progressCard.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';

            setTimeout(() => {
                progressCard.style.transform = '';
                progressCard.style.boxShadow = '';
            }, 500);
        }, 800);
    }

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            accordion.classList.toggle('active');

            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion) {
                    otherAccordion.classList.remove('active');
                }
            });
        });
    });

    const tableRows = document.querySelectorAll('.problems-table-row');

    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f9f9f9';
        });

        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });

    const allButtons = document.querySelectorAll('.video-btn, .notes-btn, .revisit-btn, .discuss-btn');

    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    const statusIndicators = document.querySelectorAll('.status-indicator');

    statusIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            if (indicator.style.backgroundColor === 'rgb(46, 204, 113)') {
                indicator.style.backgroundColor = '';
                indicator.style.borderColor = '#e0e0e0';
            } else {
                indicator.style.backgroundColor = '#2ecc71';
                indicator.style.borderColor = '#2ecc71';
            }

            updateProgressCounters();
            console.log('Problem status toggled');
        });
    });

    function updateProgressCounters() {
        const completedProblems = document.querySelectorAll('.status-indicator[style*="background-color: rgb(46, 204, 113)"]').length;
        const totalProblems = document.querySelectorAll('.status-indicator').length;

        const ratingProgressFraction = document.querySelector('.progress-card:first-child .progress-fraction');
        const ratingProgressPercentage = document.querySelector('.progress-card:first-child .progress-percentage');
        const ratingProgressCircle = document.querySelector('.progress-card:first-child circle:nth-child(2)');

        const ratingPercentage = Math.round((completedProblems / totalProblems) * 100);
        ratingProgressFraction.textContent = `${completedProblems}/${totalProblems}`;
        ratingProgressPercentage.textContent = `${ratingPercentage}%`;

        const circumference = 2 * Math.PI * 35;
        const ratingOffset = circumference - (ratingPercentage / 100) * circumference;
        ratingProgressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        ratingProgressCircle.style.strokeDashoffset = ratingOffset;

        const overallProgressFraction = document.querySelector('.progress-card:nth-child(2) .progress-fraction');
        const overallProgressPercentage = document.querySelector('.progress-card:nth-child(2) .progress-percentage');
        const overallProgressCircle = document.querySelector('.progress-card:nth-child(2) circle:nth-child(2)');

        const totalOverallProblems = 372;
        const overallPercentage = Math.round((completedProblems / totalOverallProblems) * 100);
        overallProgressFraction.textContent = `${completedProblems}/${totalOverallProblems}`;
        overallProgressPercentage.textContent = `${overallPercentage}%`;

        const overallOffset = circumference - (overallPercentage / 100) * circumference;
        overallProgressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        overallProgressCircle.style.strokeDashoffset = overallOffset;
    }

    const bookmarkButtons = document.querySelectorAll('.revisit-btn');

    bookmarkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');

            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#f39c12';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }

            console.log('Bookmark toggled');
        });
    });

    const connectButton = document.querySelector('.connect-btn');

    if (connectButton) {
        connectButton.addEventListener('mouseenter', () => {
            connectButton.style.transform = 'translateY(-2px)';
            connectButton.style.boxShadow = '0 4px 8px rgba(66, 133, 244, 0.3)';
        });

        connectButton.addEventListener('mouseleave', () => {
            connectButton.style.transform = '';
            connectButton.style.boxShadow = '';
        });

        connectButton.addEventListener('click', () => {
            const originalText = connectButton.innerHTML;
            connectButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            connectButton.disabled = true;

            setTimeout(() => {
                connectButton.innerHTML = '<i class="fas fa-check-circle"></i> Connected!';
                connectButton.style.backgroundColor = '#2ecc71';

                setTimeout(() => {
                    connectButton.innerHTML = '<i class="fas fa-link"></i> Connect Codeforces';
                    connectButton.disabled = false;
                    connectButton.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }

    const animateProgressCircles = () => {
        const circles = document.querySelectorAll('.progress-circle svg circle:nth-child(2)');

        circles.forEach(circle => {
            const progress = 0;
            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (progress / 100) * circumference;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });
    };

    animateProgressCircles();

    const ratingBtns = document.querySelectorAll('.rating-btn');

    ratingBtns.forEach(btn => {
        const tooltip = btn.querySelector('.rating-tooltip');

        btn.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
    });

    const challengeBadge = document.querySelector('.challenge-badge');
    if (challengeBadge) {
        setInterval(() => {
            challengeBadge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                challengeBadge.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }

    const problemCells = document.querySelectorAll('.problem-cell');
    problemCells.forEach(cell => {
        const difficultyIndicator = cell.querySelector('.problem-difficulty');
        if (difficultyIndicator) {
            difficultyIndicator.addEventListener('mouseenter', () => {
                difficultyIndicator.style.transform = 'scale(1.5)';
            });

            difficultyIndicator.addEventListener('mouseleave', () => {
                difficultyIndicator.style.transform = 'scale(1)';
            });
        }
    });
});