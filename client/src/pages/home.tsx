import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { PieChart, PropertyCard, PropertyReferrals, TotalRevenue } from 'components';

function Home() {
	const { data, isLoading, isError } = useList({
		resource: 'properties',
		config: {
			pagination: { pageSize: 5 },
		},
	});
	const latestProperties = data?.data ?? [];

	if (isLoading) return <Box>Loading...</Box>;
	if (isError) return <Box>Error</Box>;

	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color="#11142d">
				Dashboard
			</Typography>

			<Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
				<PieChart title="Properties for Sale" value={684} series={[75, 25]} colors={['#475ae8', '#e4b8ef']} />
				<PieChart title="Properties for Rent" value={580} series={[60, 40]} colors={['#475ae8', '#e4b8ef']} />
				<PieChart title="Total Customers" value={5684} series={[75, 25]} colors={['#475ae8', '#e4b8ef']} />
				<PieChart title="Properties for Cities" value={555} series={[75, 25]} colors={['#475ae8', '#e4b8ef']} />
			</Box>

			<Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row' }} gap={4}>
				<TotalRevenue />
				<PropertyReferrals />
			</Stack>

			<Box
				mt="25px"
				padding="20px"
				display="flex"
				flexDirection="column"
				minWidth="100%"
				flex={1}
				borderRadius="15px"
				bgcolor="#fcfcfc"
			>
				<Typography fontSize={18} fontWeight={600} color="#11142d">
					Latest Properties
				</Typography>

				<Box display="flex" flexWrap="wrap" gap={4}>
					{latestProperties.map((property) => (
						<PropertyCard
							key={property._id}
							id={property._id}
							title={property.title}
							location={property.location}
							price={property.price}
							photo={property.photo}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
