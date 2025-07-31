import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import Sandbox from './Sandbox';

const getFormElements = () => {
    const elements = {
      emailInputElement: screen.getByRole('textbox', { name: /email/i }),
      passwordInputElement: screen.getByLabelText('Password'),
      confirmPasswordInputElement: screen.getByLabelText(/confirm password/i),
      submitButton: screen.getByRole('button', {name: /submit/i}),
    };
    return elements;
};

describe('05-form-testing', () => {
    let user: UserEvent;
    beforeEach(() => {
      user = userEvent.setup();
      render(<Sandbox />);
    });
    test('inputs should be initially empty', () => {
        // const { container } = render(<Sandbox />);
        // screen.debug();
        // logRoles(container);
        const {
          emailInputElement,
          passwordInputElement,
          confirmPasswordInputElement,
        } = getFormElements();
        expect(emailInputElement).toHaveValue('');
        expect(passwordInputElement).toHaveValue('');  
        expect(confirmPasswordInputElement).toHaveValue('');
    });
    test('should be able to type in the input', async () => {
       const {
          emailInputElement,
          passwordInputElement,
          confirmPasswordInputElement,
        } = getFormElements();

        await user.type(emailInputElement, 'test@test.com');
        expect(emailInputElement).toHaveValue('test@test.com');

        await user.type(passwordInputElement, 'secret');
        expect(passwordInputElement).toHaveValue('secret');
     
        await user.type(confirmPasswordInputElement, 'secret');
        expect(confirmPasswordInputElement).toHaveValue('secret');
    });
    
    test('should show email error on invalid email', async () => {
      const {emailInputElement, submitButton} = getFormElements();

      expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();

      await user.type(emailInputElement, 'test.com');
      await user.click(submitButton);

      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });

    test('should show password error if password is less than 5 characters', async () => {
      const { emailInputElement, passwordInputElement, submitButton } = getFormElements();

      expect(screen.queryByText(/Password must be at least 5 characters/i)).not.toBeInTheDocument();

      await user.type(emailInputElement, 'test@mail.com');
      await user.type(passwordInputElement, 'pass');
      await user.click(submitButton);

      expect(screen.getByText(/Password must be at least 5 characters/i)).toBeInTheDocument();
    });

    test("should show password error if passwords don't match", async () => {
      const { emailInputElement, passwordInputElement, confirmPasswordInputElement,  submitButton } = getFormElements();
      const errorMsg = /Passwords do not match/i;

      expect(
        screen.queryByText(errorMsg)
      ).not.toBeInTheDocument();

      await user.type(emailInputElement, 'test@mail.com');
      await user.type(passwordInputElement, 'password');
      await user.type(confirmPasswordInputElement, 'password1245');
      await user.click(submitButton);

      expect(
        screen.getByText(errorMsg)
      ).toBeInTheDocument();
    });

    test('valid inputs show no errors and clear fields', async () => {
      const {
        emailInputElement,
        passwordInputElement,
        confirmPasswordInputElement,
        submitButton,
      } = getFormElements();
      await user.type(emailInputElement, 'test@test.com');
      await user.type(passwordInputElement, 'secret');
      await user.type(confirmPasswordInputElement, 'secret');
      await user.click(submitButton);

      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least 5 characters/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/passwords do not match/i)
      ).not.toBeInTheDocument();
      expect(emailInputElement).toHaveValue('');
      expect(passwordInputElement).toHaveValue('');
      expect(confirmPasswordInputElement).toHaveValue('');
    });
});