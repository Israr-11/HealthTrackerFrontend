import Swal from 'sweetalert2';

const showLoadingToast = () => {
    sessionStorage.setItem('showLoadingToast', 'true');

    Swal.fire({
        title: '<i class="bi bi-arrow-repeat spin"></i>',
        html: `
            <div class="loading-content">
                <i class="bi bi-graph-up-arrow bounce me-2"></i>
                <span>Fetching the latest logs and performance data 😊...</span>
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
            }, 900);
        }
    });
};

if (sessionStorage.getItem('showLoadingToast')) {
    Swal.fire({
        title: '<i class="bi bi-check-circle-fill text-success"></i>',
        html: `
            <div class="loading-content">
                <i class="bi bi-graph-up-arrow bounce me-2"></i>
                <span>Data fetched successfully! Updating tables and charts 😊...</span>
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
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        font-family: 'Arial', sans-serif;
    }
    .loading-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
    .spin {
        animation: spin 1.5s linear infinite;
        font-size: 2rem;
        color: #6c757d;
    }
    .bounce {
        animation: bounce 1.2s ease infinite;
        font-size: 1.5rem;
        color: #007bff;
        margin-bottom: 10px;
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

export default showLoadingToast;
