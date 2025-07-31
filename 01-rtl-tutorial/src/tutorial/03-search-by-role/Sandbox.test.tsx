import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe('03-search-by-role',() => {
    it('renders nav and  navigation links', () => {

        const { container } = render(<Sandbox />);
        
        // getByRole throws an error if there are multiple elements with the same role
        // two options:provide name or getAllByRole (returns a list)
        logRoles(container);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).
        toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });

    it('renders headings with correct hierarchy', () => {
        render(<Sandbox />);

         expect(
           screen.getByRole('heading', { name: 'Main Heading', level: 1 })
         ).toBeInTheDocument();
         expect(
           screen.getByRole('heading', { name: 'Subheading', level: 4 })
         ).toBeInTheDocument();
    });

     it('renders image with alt text', () => {
       render(<Sandbox />);

       expect(screen.getByRole('img', { name: 'Example' })).toBeInTheDocument();
     });

    it('renders initial buttons', () => {
       render(<Sandbox />);

       expect(
         screen.getByRole('button', { name: 'Click me' })
       ).toBeInTheDocument();
       expect(
         screen.getByRole('button', { name: 'Submit' })
       ).toBeInTheDocument();
       expect(
         screen.getByRole('button', { name: 'Cancel' })
       ).toBeInTheDocument();
     });

    it('error button is not initially visible', () => {
        render(<Sandbox />);

        expect(
          screen.queryByRole('button', { name: 'Error' })
        ).not.toBeInTheDocument();
      });
      
    it('async button appears after delay', async () => {
        render(<Sandbox />);

        // Button should not be present initially
        expect(
          screen.queryByRole('button', { name: 'Async Button' })
        ).not.toBeInTheDocument();

        // Wait for button to appear using findByRole
        const asyncButton = await screen.findByRole('button', {
          name: 'Async Button',
        });
        expect(asyncButton).toBeInTheDocument();
    });
});