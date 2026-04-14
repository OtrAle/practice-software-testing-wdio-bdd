class PriceSlider {
	get handleMin() {
		return $(".ngx-slider-pointer-min");
	}

	get handleMax() {
		return $(".ngx-slider-pointer-max");
	}

	async setSliderRange(targetMin: number, targetMax: number) {
		const currentMax = await this.getHandleValue(this.handleMax);
		if (currentMax !== targetMax) {
			await this.handleMax.click();
			await browser.keys("End");
			const pageDownsMax = Math.floor((200 - targetMax) / 20);
			const remainingMax = (200 - targetMax) % 20;
			await browser.keys(Array(pageDownsMax).fill("PageDown"));
			await browser.keys(Array(remainingMax).fill("ArrowLeft"));
		}

		const currentMin = await this.getHandleValue(this.handleMin);
		if (currentMin !== targetMin) {
			await this.handleMin.click();
			await browser.keys("Home");
			const pageUpsMin = Math.floor(targetMin / 20);
			const remainingMin = targetMin % 20;
			await browser.keys(Array(pageUpsMin).fill("PageUp"));
			await browser.keys(Array(remainingMin).fill("ArrowRight"));
		}
	}

	async getRange() {
		const [min, max] = await Promise.all([this.getHandleValue(this.handleMin), this.getHandleValue(this.handleMax)]);
		return { min: Number(min), max: Number(max) };
	}

	private async getHandleValue(handle: ChainablePromiseElement): Promise<number> {
		return Number(await handle.getAttribute("aria-valuenow"));
	}
}

export default new PriceSlider();
