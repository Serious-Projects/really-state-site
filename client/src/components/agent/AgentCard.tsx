import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material';
import { Box, Stack } from '@mui/system';
import { useGetIdentity } from '@pankod/refine-core';
import { Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { AgentCardProp, InfoBarProps } from 'interfaces/agent';

function InfoBar({ icon, name }: InfoBarProps) {
	return (
		<Stack direction="column" flex={1} minWidth={{ xs: '100%', sm: 300 }} gap={1.5}>
			{icon}
			<Typography fontSize={14} color="#808191">
				{name}
			</Typography>
		</Stack>
	);
}

function AgentCard({ id, name, email, avatar, noOfProperties }: AgentCardProp) {
	const { data: currentUser } = useGetIdentity();

	const generateLink = (): string => {
		return currentUser.email === email ? '/my-profile' : `/agents/show/${id}`;
	};

	return (
		<Box
			component={Link}
			to={generateLink()}
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: '20px',
				padding: '20px',
				'&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)' },
			}}
		>
			<img
				src={avatar}
				alt="user"
				style={{
					width: 90,
					height: 90,
					objectFit: 'cover',
				}}
			/>

			<Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
				<Stack direction="row" flexWrap="wrap" alignItems="center" gap={2}>
					<Typography fontSize={22} fontWeight={600} color="#11142d">
						{name}
					</Typography>
					<Typography fontSize={14} color="#808191">
						Real-Estate Agent
					</Typography>
				</Stack>

				<Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
					<InfoBar icon={<EmailOutlined sx={{ color: '#808191' }} />} name={email} />
					<InfoBar icon={<Place sx={{ color: '#808191' }} />} name="India" />
					<InfoBar icon={<Phone sx={{ color: '#808191' }} />} name="+91 9004903289" />
					<InfoBar icon={<LocationCity sx={{ color: '#808191' }} />} name={`${noOfProperties} Properties`} />
				</Stack>
			</Stack>
		</Box>
	);
}

export default AgentCard;
