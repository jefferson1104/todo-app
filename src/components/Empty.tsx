interface IEmptyProps {
    title: string;
    description?: string;
    icon?: JSX.Element;
}

export const Empty = ({ title, description, icon }: IEmptyProps) => {
    // Renders
    return (
        <div className="flex flex-col items-center p-8 gap-2">
            <div className="text-6xl text-gray-500">
                {icon}
            </div>
            <div>
                <h2 className="text-center font-bold text-xl sm:text-2xl text-gray-500">
                    {title}
                </h2>
            </div>
            <div>
                <p className="text-center text-xs sm:text-sm text-gray-400">
                    {description}
                </p>
            </div>

        </div>
    );
};
