interface CompanyFormData {
    company: string;
    distributor: string;
    duration: string;
    penalty: string;
    created: Date;
    active: boolean;
}

class FormValidator {
    private form: HTMLFormElement;
    private errorMessages: Map<string, string>;

    constructor(formId: string) {
        this.form = document.querySelector(`#${formId}`) as HTMLFormElement;
        this.errorMessages = new Map();
        this.initializeValidation();
    }

    private initializeValidation(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input');
   
    }

    private validateField(input: HTMLInputElement): boolean {
        const value = input.value.trim();
        const fieldName = input.name;
        
        switch(fieldName) {
            case 'company':
            case 'distributor':
                return this.validateCompany(value, fieldName);
            case 'duration':
            case 'penalty':
                return this.validateMonths(value, fieldName);
            case 'password':
                return this.validatePassword(value);
            default:
                return true;
        }
    }

    private validateCompany(value: string, fieldName: string): boolean {
        if (value.length < 1) {
            this.showError(fieldName, `El ${fieldName === 'company' ? 'compañia' : 'distribuidor'} no puede estar vacío`);
            return false;
        }
        this.removeError(fieldName);
        return true;
    }

    private validateMonths(fieldName: string, value: number): boolean {
        if (value === null || value === undefined) {
            this.showError(fieldName, `El valor de ${fieldName === 'contract_duration' ? 'la duración del contrato' : 'el periodo de penalización'} no puede estar vacío`);
            return false;
        }
    
        if (value < 0 || value > 24) {
            this.showError(fieldName, `El valor de ${fieldName === 'contract_duration' ? 'la duración del contrato' : 'el periodo de penalización'} debe estar entre 0 y 24`);
            return false;
        }
    
        this.removeError(fieldName);
        return true;
    }

    private validatePassword(value: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|@#$%&])[A-Za-z\d|@#$%&]{8,}$/;
        if (!passwordRegex.test(value)) {
            this.showError('password',  'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (|@#$%&)');
            return false;
        }
        this.removeError('password');
        return true;
    }

    private showError(fieldName: string, message: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        let errorDiv = input.parentElement?.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement?.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }

    private removeError(fieldName: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        const errorDiv = input.parentElement?.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;


        inputs.forEach(input => {
            if (!this.validateField(input as HTMLInputElement)) {
                isValid = false;
            }
        });
        if (isValid) {
            this.form.submit();
        }
    }
} 

export default FormValidator;