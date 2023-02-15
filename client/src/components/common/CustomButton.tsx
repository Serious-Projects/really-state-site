import { Button } from '@pankod/refine-mui';
import { CustomButtonProps } from 'interfaces/common';

function CustomButton({
	type,
	title,
	handleClick,
	backgroundColor,
	color,
	icon,
	fullWidth,
	disabled,
}: CustomButtonProps) {
	return (
		<Button
			type={type === 'submit' ? 'submit' : 'button'}
			sx={{
				flex: fullWidth ? 1 : 'unset',
				padding: '10px 15px',
				width: fullWidth ? '100%' : 'fit-content',
				minWidth: 130,
				bgcolor: backgroundColor,
				color,
				fontSize: 16,
				fontWeight: 600,
				gap: '10px',
				textTransform: 'capitalize',
				'&:hover': {
					opacity: 0.9,
					bgcolor: backgroundColor,
				},
			}}
			onClick={handleClick}
			disabled={disabled}
		>
			{icon} {title}
		</Button>
	);
}

export default CustomButton;