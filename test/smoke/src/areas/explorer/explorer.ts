/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { SpectronApplication } from '../../spectron/application';
import { Viewlet } from '../workbench/viewlet';


export class Explorer extends Viewlet {

	private static EXPLORER_VIEWLET = 'div[id="workbench.view.explorer"]';
	private static OPEN_EDITORS_VIEW = `${Explorer.EXPLORER_VIEWLET} .split-view-view:nth-child(1) .title`;

	constructor(spectron: SpectronApplication) {
		super(spectron);
	}

	public openExplorerView(): Promise<any> {
		return this.spectron.runCommand('workbench.view.explorer');
	}

	public getOpenEditorsViewTitle(): Promise<string> {
		return this.spectron.client.waitForText(Explorer.OPEN_EDITORS_VIEW);
	}

	public async openFile(fileName: string): Promise<any> {
		await this.spectron.client.doubleClickAndWait(`div[class="monaco-icon-label file-icon ${fileName}-name-file-icon ${this.getExtensionSelector(fileName)} explorer-item"]`);
		await this.spectron.workbench.waitForEditorFocus(fileName);
	}

	public getExtensionSelector(fileName: string): string {
		const extension = fileName.split('.')[1];
		if (extension === 'js') {
			return 'js-ext-file-icon ext-file-icon javascript-lang-file-icon';
		} else if (extension === 'json') {
			return 'json-ext-file-icon ext-file-icon json-lang-file-icon';
		} else if (extension === 'md') {
			return 'md-ext-file-icon ext-file-icon markdown-lang-file-icon';
		}
		throw new Error('No class defined for this file extension');
	}

}