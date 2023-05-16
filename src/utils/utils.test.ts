import { it, expect, describe } from 'vitest'
import { getDateHeader, getDateFromString, setDateToString } from './utils';
import moment from 'moment';


describe('utils', () => {
    describe('getDateHeader', () => {
        // Tests that getDateHeader function returns an array with the expected number of elements. 
        it("return array of strings", () => {
            const result = getDateHeader("2022-01-01T00:00:00.000Z");
            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe("string");
        });
        it("returns correct number of elements", () => {
            const result = getDateHeader(moment().format('YYYY-MM-DD HH:mm:ss'));
            expect(result.length).toBe(49);
        });
        it("handles invalid date string", () => {
            const result = getDateHeader("invalid date string");
            expect(result).toEqual([]);
        });
        it("returns empty array if start date is after end date", () => {
            const result = getDateHeader(moment().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'));
            expect(result).toEqual([]);
        });
    });

    describe('getDateFromString', () => {
        it("Valid input with 14 digits", () => {
            const input = "20220101120000";
            const expectedOutput = "2022-01-01 12:00:00";
            const result = getDateFromString(input);
            expect(result).toEqual(expectedOutput);
        });
        it("Valid input with leading trailing spaces", () => {
            const input = "   20220101120000   ";
            const expectedOutput = "2022-01-01 12:00:00";
            const result = getDateFromString(input);
            expect(expectedOutput).toEqual(result);
        });
        it("Invalid Input with less than 14 digits", () => {
            const input = "2022010112000"; 

            const result = getDateFromString(input);
            expect(result).toBe('');
        });
        it("test_invalid_input_with_non_numeric_characters", () => {
            const input = "2022a0101200000";
    
            const result = getDateFromString(input);
            expect(result).toBe('');
        });

    });

    describe('setDateToString', () => {
        it("Half hour date", () => {
            const date = moment("2022-01-01 12:30:00");
            const result = setDateToString(date);
            expect(result).toBe("20220101123000");
        });
        it("String format 14 digits", () => {
            const date = moment("2022-01-01 12:15:00");
            const result = setDateToString(date);
            expect(result).toMatch(/^\d{14}$/);
        });
    })
})