import { Place } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { PropertyCardProps } from 'interfaces/property';

function PropertyCard({ id, title, price, location, photo }: PropertyCardProps) {
	return (
		<Card
			component={Link}
			to={`/properties/show/${id}`}
			sx={{
				maxWidth: '330px',
				padding: '10px',
				cursor: 'pointer',
				'&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)' },
			}}
			elevation={0}
		>
			<CardMedia
				component="img"
				width="100%"
				height={210}
				image={photo}
				alt="Card Image"
				sx={{ borderRadius: '10px' }}
			/>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: '10px',
					paddingX: '5px',
				}}
			>
				<Stack direction="column" gap={1}>
					<Typography fontSize={16} fontWeight={500} color="#11142d">
						{title}
					</Typography>
					<Stack direction="row" gap={0.5} alignItems="flex-start">
						<Place sx={{ fontSize: 18, color: '#11142d', mt: 0.5 }} />
						<Typography fontSize={14} color="#808191">
							{location}
						</Typography>
					</Stack>
				</Stack>
				<Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
					<Typography fontSize={12} fontWeight={500} color="#475be8">
						₹ {price}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}

export default PropertyCard;
