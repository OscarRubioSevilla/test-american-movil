import { describe, it, vi, beforeEach, expect, afterEach } from "vitest";

import {  fireEvent, render, screen, cleanup } from "@testing-library/react";
import ChannelModal from "./ChannelModal";
 
describe('Channel MODAL', async function () {
    const handleClose = vi.fn();
    
    beforeEach(async () => {
        render(<ChannelModal handleClose={handleClose} />)
    }); 
    afterEach(cleanup);

    it('should render modal correctly', async function () {
        const algo = await screen.findByRole('modal');
        const title = await screen.findByRole('title');
        expect(algo.textContent).toBeDefined();
        expect(title.textContent).toBeDefined();
    });

    it("should modal closed successfully", async () => {
        const btn = await screen.findByRole("close_modal")
        // Click on OK button
        fireEvent.click(btn);
        // Assert that handleClose function was called
        expect(handleClose).toHaveBeenCalled();
    });
} )