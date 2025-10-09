import { useState } from "react";
import { Box, Card, CardContent, Typography, Link, Stack, Button, Chip, Divider, Tooltip } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const HelpSupport = () => {
	const email = "connect.sntl@gmail.com";
	const phoneDisplay = "+91 94885 18552";
	const phoneHref = "+919488518552";

	const [copied, setCopied] = useState<"email" | "phone" | null>(null);

	const handleCopy = async (value: string, key: "email" | "phone") => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
			setTimeout(() => setCopied(null), 1200);
		} catch {}
	};

	return (
		<Box sx={{
			minHeight: '100%',
			p: { xs: 2, md: 4 },
			background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.secondary.light}22 100%)`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<Card elevation={0} sx={{
				maxWidth: 840,
				width: '100%',
				backdropFilter: 'blur(6px)',
				backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#111827cc' : '#ffffffcc',
				border: (theme) => `1px solid ${theme.palette.divider}`,
				boxShadow: (theme) => theme.shadows[4],
				borderRadius: 3,
			}}>
				<CardContent sx={{ p: { xs: 3, md: 5 } }}>
					<Stack spacing={3}>
						<Stack direction="row" alignItems="center" spacing={1.5}>
							<SupportAgentIcon color="primary" fontSize="large" />
							<Typography variant="h4" fontWeight={800}>Help & Support</Typography>
						</Stack>
						<Typography variant="body1" color="text.secondary">
							We 0re here to help. Reach us via email or phone and we 0will get back to you as soon as possible.
						</Typography>

						<Box sx={{
							borderRadius: 2,
							p: { xs: 2, md: 3 },
							border: (theme) => `1px dashed ${theme.palette.divider}`,
							backgroundColor: (theme) => theme.palette.action.hover,
						}}>
							<Stack spacing={2}>
								<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
									<Stack direction="row" spacing={1.5} alignItems="center">
										<MailOutlineIcon color="action" />
										<Box>
											<Typography variant="overline" color="text.secondary">Email</Typography>
											<Typography variant="h6">
												<Link href={`mailto:${email}`} underline="hover">{email}</Link>
											</Typography>
										</Box>
									</Stack>
									<Stack direction="row" spacing={1}>
										<Button variant="contained" color="primary" href={`mailto:${email}`}>Email us</Button>
										<Tooltip title={copied === 'email' ? 'Copied!' : 'Copy email'}>
											<Button variant="outlined" color="primary" onClick={() => handleCopy(email, 'email')} startIcon={<ContentCopyIcon fontSize="small" />}>Copy</Button>
										</Tooltip>
									</Stack>
								</Stack>

								<Divider />

								<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
									<Stack direction="row" spacing={1.5} alignItems="center">
										<PhoneInTalkIcon color="action" />
										<Box>
											<Typography variant="overline" color="text.secondary">Phone Support</Typography>
											<Typography variant="h6">
												<Link href={`tel:${phoneHref}`} underline="hover">{phoneDisplay}</Link>
											</Typography>
											<Chip label="9:30 AM - 6:30 PM IST" size="small" variant="outlined" sx={{ mt: 0.5 }} />
										</Box>
									</Stack>
									<Stack direction="row" spacing={1}>
										<Button variant="contained" color="secondary" href={`tel:${phoneHref}`}>Call now</Button>
										<Tooltip title={copied === 'phone' ? 'Copied!' : 'Copy number'}>
											<Button variant="outlined" color="secondary" onClick={() => handleCopy(phoneDisplay, 'phone')} startIcon={<ContentCopyIcon fontSize="small" />}>Copy</Button>
										</Tooltip>
									</Stack>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
};

export default HelpSupport;
