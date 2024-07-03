import * as CheckboxRadix from '@radix-ui/react-checkbox';

import { FaCheck } from "react-icons/fa";

interface ICheckboxProps {
    isChecked: boolean;
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Checkbox = ({ isChecked, onClickHandler }: ICheckboxProps) => {
    // Renders
    return (
        <CheckboxRadix.Root
            className="flex items-center justify-center h-[23.5px] w-[23.5px] rounded-md  hover:bg-green-200 border border-gray-400 transition-colors duration-500"
            checked={isChecked}
            onClick={onClickHandler}
        >
            <CheckboxRadix.Indicator className="text-green-700">
                <FaCheck />
            </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
    );
}
