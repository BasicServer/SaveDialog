import {
	Button,
	ButtonStyles,
	HStack,
	Input, Spacer, State, TextInputCfg,
	VStack
} from '@frugal-ui/base';
import FilePicker, {Types} from '@frugal-ui/fsexpress-filepicker';

type SaveFn = (filePath: string) => void;

export default function SaveDialog(
	rootName: string,
	initialDirectory: string,
	save: SaveFn,
	cancel: () => void,
) {
	const fileName = new State('');
	const openDirectory = new State(initialDirectory);

	return VStack(
		HStack(
			Spacer(),

			Input(new TextInputCfg(fileName, 'Untitled')),
			Button({
				style: ButtonStyles.Primary,
				accessibilityLabel: 'save here',
				text: 'Save',
				action: () => save(`${openDirectory.value}/${fileName.value}`),
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

		FilePicker(rootName, openDirectory, [Types.Directory]),
	);
}
