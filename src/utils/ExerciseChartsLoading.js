import Swal from 'sweetalert2';

const showExerciseLoadingToast = () => {
    sessionStorage.setItem('showLoadingToast', 'true');

    Swal.fire({
        title: '<i class="bi bi-arrow-repeat spin"></i>',
        html: `
            <div class="loading-content">
                <i class="bi bi-graph-up-arrow bounce me-2"></i>
                <span>We are fetching updated exercise performance data 😊...</span>
            </div>
        `,
        position: 'center',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 5000,
        customClass: {
            popup: 'loading-toast'
        },
        didOpen: () => {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });
};

if (sessionStorage.getItem('showLoadingToast')) {
    Swal.fire({
        title: '<i class="bi bi-arrow-repeat spin"></i>',
        html: `
            <div class="loading-content">
                <i class="bi bi-graph-up-arrow bounce me-2"></i>
                <span>Successfully fetched! We are updating bar chart with latest data 😊...</span>
            </div>
        `,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            popup: 'loading-toast'
        }
    });
    sessionStorage.removeItem('showLoadingToast');
}

const style = document.createElement('style');
style.textContent = `
    .loading-toast {
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
    }
    .spin {
        animation: spin 1s linear infinite;
    }
    .bounce {
        animation: bounce 1s ease infinite;
    }
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

export default showExerciseLoadingToast;
