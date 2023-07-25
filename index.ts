import {
	Button,
	ButtonStyles,
	ComputedState,
	HStack,
	Input,
	Spacer,
	State,
	TextInputCfg,
	VStack,
} from '@frugal-ui/base';
import FilePicker, { SelectedItem, Types } from '@basicserver/filepicker';

type SaveFn = (filePath: string) => void;

export default function SaveDialog(
	rootName: string,
	initialDirectory: string,
	save: SaveFn,
	cancel: () => void,
) {
	const fileName = new State('');
	const directoryPath = new State('');
	const selectedItem = new SelectedItem((item) => {
		if (item.path == undefined) {
			fileName.value = '';
			directoryPath.value = '';
		} else if (item.isDirectory == true) {
			directoryPath.value = item.path ?? '';
		} else {
			fileName.value = item.name ?? '';
		}
	});

	return VStack(
		HStack(
			Spacer(),

			Input(new TextInputCfg(fileName, 'Untitled')),
			Button({
				style: ButtonStyles.Primary,
				accessibilityLabel: 'save here',
				text: 'Save',
				action: () => save(`${directoryPath.value}/${fileName.value}`),
			}),

			Spacer(),

			Button({
				accessibilityLabel: 'cancel',
				iconName: 'close',
				action: cancel,
			}),
		)
			.useDefaultPadding()
			.useDefaultSpacing()
			.cssBorderBottom('1px solid var(--lines)'),

		FilePicker(rootName, initialDirectory, selectedItem, [Types.File, Types.Directory]),
	);
}
