import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubdivisionDisplay } from './SubdivisionDisplay';
import { subDivisionsApiRoute } from '../../service';
import { SubdivisionType } from '../../interface'


describe('SubdivisionDisplay Component', () => {

    let mockSubdivisions:SubdivisionType[];
    const mockTableSorting = jest.fn();
    const mockTableFilter = jest.fn();

    beforeAll(async () => {
        mockSubdivisions = await subDivisionsApiRoute();
    });

    it('renders subdivisions', () => {
        render(<SubdivisionDisplay tableFilter={mockTableFilter} tableSorting={mockTableSorting} subdivisions={mockSubdivisions} />);
        mockSubdivisions.forEach(subdivision => {
            const prompt = screen.getByText(expect.stringContaining(subdivision.name))
            expect(prompt).toBeInTheDocument();
        });
    })
        
});
