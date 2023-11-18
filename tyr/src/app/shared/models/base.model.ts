export interface FormMessage {
	type: string;
	message: string;
}

/** Will enable isLoading checker */
export class LoadableComponent {
	isLoading = false

	public toggleLoader(): boolean {
		return this.isLoading = !this.isLoading
	}

}