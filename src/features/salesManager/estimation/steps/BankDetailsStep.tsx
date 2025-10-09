import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { FormControl, MenuItem, Select, type SelectChangeEvent, CircularProgress, Alert } from '@mui/material';
import { type BankDetails, type BankUnit } from '../estimation.types';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface BankFormProps {
  onBankInfoChange: (info: BankDetails, isValid: boolean) => void;
  savedData?: BankDetails | null;
}

export default function BankDetailsStep({ onBankInfoChange, savedData }: BankFormProps) {
  const [unitList, setUnitList] = useState<BankUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankId: '',
    bankTitle: '',
    bankName: '',
    accountNo: '',
    accountType: '',
    micrCode: '',
    ifscCode: '',
  });
  
  // Use a ref to track whether the form has been updated
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (savedData) {
      setBankDetails(savedData);
      setSelectedUnit(savedData.bankId || '');
    }
  }, []);  // Only run once on mount

  // This effect runs only when bankDetails or selectedUnit changes,
  // but uses hasUpdated ref to prevent the initial render from causing an update
  useEffect(() => {
    // Skip the initial render
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      return;
    }
    
    const isValid =
      selectedUnit !== '' &&
      bankDetails.bankName !== '' &&
      bankDetails.accountNo !== '';
    
    onBankInfoChange(bankDetails, isValid);
  }, [bankDetails, selectedUnit]);  // Remove onBankInfoChange from dependencies

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch('https://sbiapi.ssengineeringworks.online/api/admin/getBanks', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) return { data: [] };
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUnitList(data);
        } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
          setUnitList(data.data);
        } else {
          setUnitList([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching units:', error);
        setUnitList([]);
      });
  }, []);  // Only run once on mount

  const fetchBankDetails = useCallback(async (bankId: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getBankbyId?id=${bankId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        setError('No bank details found for the selected bank.');
        setBankDetails({
          bankId: '',
          bankTitle: '',
          bankName: '',
          accountNo: '',
          accountType: '',
          micrCode: '',
          ifscCode: '',
        });
        return;
      }

      if (!response.ok) throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);

      const data = await response.json();
      const bankData = data?.data || data;

      if (bankData && typeof bankData === 'object') {
        const newDetails: BankDetails = {
          bankId: bankData.id || '',
          bankTitle: bankData.title || '',
          bankName: bankData.bankName || '',
          accountNo: bankData.acNumber || '',
          accountType: bankData.acType || '',
          micrCode: bankData.micrCode || '',
          ifscCode: bankData.ifscCode || '',
        };
        setBankDetails(newDetails);
      } else {
        setError('Invalid data format from server.');
        setBankDetails({
          bankId: '',
          bankTitle: '',
          bankName: '',
          accountNo: '',
          accountType: '',
          micrCode: '',
          ifscCode: '',
        });
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
      setError('Failed to fetch bank details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const bankId = event.target.value;
    setSelectedUnit(bankId);
    if (bankId) {
      fetchBankDetails(bankId);
    } else {
      setBankDetails({
        bankId: '',
        bankTitle: '',
        bankName: '',
        accountNo: '',
        accountType: '',
        micrCode: '',
        ifscCode: '',
      });
    }
  };

  const handleBankNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails(prev => ({
      ...prev,
      bankName: event.target.value,
    }));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={12}>
        <FormControl fullWidth>
          <FormLabel id="bank-title-label" required>
            Title of the bank
          </FormLabel>
          <Select
            labelId="bank-title-label"
            id="bank-title-select"
            value={selectedUnit}
            onChange={handleChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="" disabled>
              Select bank title
            </MenuItem>
            {Array.isArray(unitList) && unitList.map((unit) => (
              <MenuItem key={unit.id} value={unit.id.toString()}>
                {unit.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGrid>
      
      {error && (
        <Grid>
          <Alert severity="warning">{error}</Alert>
        </Grid>
      )}
      
      {loading ? (
        <Grid container justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="bank-name" required>
              Name of the bank
            </FormLabel>
            <OutlinedInput
              id="bank-name"
              name="bank-name"
              type="text"
              placeholder="Bank name"
              autoComplete="bank name"
              required
              size="small"
              readOnly
              value={bankDetails.bankName}
              onChange={handleBankNameChange}
              sx={{ bgcolor: 'action.hover' }}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="account-no" required>
              Account No
            </FormLabel>
            <OutlinedInput
              id="account-no"
              name="account-no"
              type="text"
              placeholder="Account number"
              autoComplete="account number"
              required
              size="small"
              value={bankDetails.accountNo}
              readOnly
              sx={{ bgcolor: 'action.hover' }}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="account-type" required>
              Type of Account
            </FormLabel>
            <OutlinedInput
              id="account-type"
              name="account-type"
              type="text"
              placeholder="Account type"
              autoComplete="account type"
              required
              size="small"
              value={bankDetails.accountType}
              readOnly
              sx={{ bgcolor: 'action.hover' }}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="micr-code" required>
              MICR code
            </FormLabel>
            <OutlinedInput
              id="micr-code"
              name="micr-code"
              type="text"
              placeholder="MICR code"
              autoComplete="micr-code"
              required
              size="small"
              value={bankDetails.micrCode}
              readOnly
              sx={{ bgcolor: 'action.hover' }}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="ifsc-code" required>
              IFSC code
            </FormLabel>
            <OutlinedInput
              id="ifsc-code"
              name="ifsc-code"
              type="text"
              placeholder="IFSC code"
              autoComplete="ifsc code"
              required
              size="small"
              value={bankDetails.ifscCode}
              readOnly
              sx={{ bgcolor: 'action.hover' }}
            />
          </FormGrid>
        </>
      )}
    </Grid>
  );
}