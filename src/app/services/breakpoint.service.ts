import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
	providedIn: 'root'
})
export class BreakpointService {

	display: { [key: string]: any } = {
		isHandset: false,
		isHandsetLandscape: false,
		isHandsetPortrait: false,
		isLarge: false,
		isMedium: false,
		isSmall: false,
		isTablet: false,
		isTabletLandscape: false,
		isTabletPortrait: false,
		isWeb: false,
		isWebLandscape: false,
		isWebPortrait: false,
		isXLarge: false,
		isXSmall: false,
	};

	responsiveClass: string = '';

	constructor(
		private responsive: BreakpointObserver,
	) {
		this.responsive.observe([
			Breakpoints.Handset,
			Breakpoints.HandsetLandscape,
			Breakpoints.HandsetPortrait,
			Breakpoints.Large,
			Breakpoints.Medium,
			Breakpoints.Small,
			Breakpoints.Tablet,
			Breakpoints.TabletLandscape,
			Breakpoints.TabletPortrait,
			Breakpoints.Web,
			Breakpoints.WebLandscape,
			Breakpoints.WebPortrait,
			Breakpoints.XLarge,
			Breakpoints.XSmall])
			.subscribe(result => {

				const breakpoints = result.breakpoints;

				if (breakpoints[Breakpoints.Handset]) {
					this.displayMode("isHandset");
					this.responsiveClass = "is-handset";
				} else if (breakpoints[Breakpoints.HandsetLandscape]) {
					this.displayMode("isHandsetLandscape");
					this.responsiveClass = "is-handset-landscape";
				} else if (breakpoints[Breakpoints.HandsetPortrait]) {
					this.displayMode("isHandsetPortrait");
					this.responsiveClass = "is-handset-portrait";
				} else if (breakpoints[Breakpoints.Large]) {
					this.displayMode("isLarge");
					this.responsiveClass = "is-large";
				} else if (breakpoints[Breakpoints.Medium]) {
					this.displayMode("isMedium");
					this.responsiveClass = "is-medium";
				} else if (breakpoints[Breakpoints.Small]) {
					this.displayMode("isSmall");
					this.responsiveClass = "is-small";
				} else if (breakpoints[Breakpoints.Tablet]) {
					this.displayMode("isTablet");
					this.responsiveClass = "is-tablet";
				} else if (breakpoints[Breakpoints.TabletLandscape]) {
					this.displayMode("isTabletLandscape");
					this.responsiveClass = "is-tablet-landscape";
				} else if (breakpoints[Breakpoints.TabletPortrait]) {
					this.displayMode("isTabletPortrait");
					this.responsiveClass = "is-tablet-portrait";
				} else if (breakpoints[Breakpoints.Web]) {
					this.displayMode("isWeb");
					this.responsiveClass = "is-web";
				} else if (breakpoints[Breakpoints.WebLandscape]) {
					this.displayMode("isWebLandscape");
					this.responsiveClass = "is-web-landscape";
				} else if (breakpoints[Breakpoints.WebPortrait]) {
					this.displayMode("isWebPortrait");
					this.responsiveClass = "is-web-portrait";
				} else if (breakpoints[Breakpoints.XLarge]) {
					this.displayMode("isXLarge");
					this.responsiveClass = "is-x-large";
				} else if (breakpoints[Breakpoints.XSmall]) {
					this.displayMode("isXSmall");
					this.responsiveClass = "is-x-small";
				}
			})
	}

	displayMode(mode: string) {
		for (let displaymode of Object.keys(this.display)) {
			if (displaymode == mode) {
				this.display[displaymode] = true;
				console.log(displaymode, " = true")
			} else {
				this.display[displaymode] = false;
			}
		}
	}
}