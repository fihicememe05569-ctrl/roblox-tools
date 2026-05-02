interface UserInput { name: string; age: number; email: string; }

const validateInput = (input: UserInput): boolean => {
    const { name, age, email } = input;
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(name)) {
        console.error('Invalid name format');
        return false;
    }
    if (age < 0 || age > 120) {
        console.error('Age must be between 0 and 120');
        return false;
    }
    if (!emailRegex.test(email)) {
        console.error('Invalid email format');
        return false;
    }
    return true;
};

const mainProcessLoop = (input: UserInput) => {
    if (validateInput(input)) {
        console.log('Input is valid, processing...');
        // Main processing logic here
    } else {
        console.error('Input validation failed');
    }
};