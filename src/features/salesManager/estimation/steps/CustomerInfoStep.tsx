import * as React from 'react';
import { Alert, FormLabel, Grid, OutlinedInput, styled } from '@mui/material';
import type { CustomerInfo } from '../estimation.types'; // Assuming CustomerInfo type will be updated

// Update CustomerInfo type in your type.ts to include phone
// export interface CustomerInfo {
//   firstName: string;
//   lastName: string;
//   phone: string; // Added phone
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
//   gst: string;
// }


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface CustomerInfoFormProps {
  onInfoChange: (info: CustomerInfo, isValid: boolean) => void;
  savedData?: CustomerInfo | null;
}

export default function CustomerInfoStep({ onInfoChange, savedData }: CustomerInfoFormProps) {
  const [formData, setFormData] = React.useState<CustomerInfo>(() => {
    const defaultState: CustomerInfo = {
      firstName: '',
      lastName: '',
      phone: '', // Added phone
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      gst: ''
    };

    if (savedData) {
      return { ...defaultState, ...savedData }; // Merge with default to ensure all fields exist
    }
    const localData = localStorage.getItem('checkoutCustomerInfo');
    if (localData) {
      try {
        return { ...defaultState, ...JSON.parse(localData) };
      } catch (e) {
        console.error("Error parsing customer info from localStorage", e);
        return defaultState;
      }
    }
    return defaultState;
  });


  const [touched, setTouched] = React.useState<Record<keyof CustomerInfo, boolean>>(() => {
    const hasData = savedData || localStorage.getItem('checkoutCustomerInfo');
    const initialTouched: Record<keyof CustomerInfo, boolean> = {
      firstName: !!hasData,
      lastName: !!hasData,
      phone: !!hasData, // Added phone
      address1: !!hasData,
      address2: !!hasData, // address2 is optional in validation, but can be touched
      city: !!hasData,
      state: !!hasData,
      zip: !!hasData,
      country: !!hasData,
      gst: !!hasData // gst is optional in validation
    };
    return initialTouched;
  });

  React.useEffect(() => {
    if (savedData) {
      setFormData(prev => ({ ...prev, ...savedData })); // Ensure merging with default
      const isValid = validateForm(savedData);
      onInfoChange(savedData, isValid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]); // Removed onInfoChange from deps as it can cause loops if parent re-renders

  React.useEffect(() => {
    const isValid = validateForm(formData);
    onInfoChange(formData, isValid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial validation, removed formData from deps

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    const isValid = validateForm(newFormData);
    onInfoChange(newFormData, isValid);
    
    localStorage.setItem('checkoutCustomerInfo', JSON.stringify(newFormData));
  };


  const handleBlur = (field: keyof CustomerInfo) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = (data: CustomerInfo): boolean => {
    return Boolean(
      data.firstName &&
      data.lastName &&
      data.phone && // Added phone to validation
      data.address1 &&
      // data.address2 && // Address line 2 is often optional, adjust if truly required
      data.city &&
      data.state &&
      data.zip &&
      data.country
      // data.gst && // GST is often optional for individuals, adjust if truly required
    );
  };


  React.useEffect(() => {
    console.log("CustomerInfoForm data:", formData);
    console.log("CustomerInfoForm Is valid:", validateForm(formData));
  }, [formData]);

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="firstName" required>First name</FormLabel>
        <OutlinedInput
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={() => handleBlur("firstName")}
          error={touched.firstName && !formData.firstName}
          placeholder="John"
          required
          size="small"
        />
        {touched.firstName && !formData.firstName && (
          <Alert severity="error" sx={{ mt: 1 }}>
            First name is required
          </Alert>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="lastName" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="lastName"
          name="lastName"
          placeholder="Snow"
          autoComplete="last name"
          required
          size="small"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={() => handleBlur("lastName")}
          error={touched.lastName && !formData.lastName}
        />
         {touched.lastName && !formData.lastName && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Last name is required
          </Alert>
        )}
      </FormGrid>

      {/* Added Phone Number Field */}
      <FormGrid item xs={12} md={12}>
        <FormLabel htmlFor="phone" required>
          Phone number
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="tel" // Use type="tel" for phone numbers
          placeholder="e.g., +1 555 123 4567"
          autoComplete="tel"
          required
          size="small"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          error={touched.phone && !formData.phone}
        />
        {touched.phone && !formData.phone && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Phone number is required
          </Alert>
        )}
      </FormGrid>

      <FormGrid item xs={12} md={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="text" // Changed from address1
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
          value={formData.address1}
          onChange={handleChange}
          onBlur={() => handleBlur("address1")}
          error={touched.address1 && !formData.address1}
        />
         {touched.address1 && !formData.address1 && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Address line 1 is required
          </Alert>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={12}>
        <FormLabel htmlFor="address2">Address line 2 (Optional)</FormLabel> 
        {/* Labelled as optional if not in validation */}
        <OutlinedInput
          id="address2"
          name="address2"
          type="text" // Changed from address2
          placeholder="Apartment, suite, unit, etc."
          autoComplete="shipping address-line2"
          // required // Removed if not strictly required by validateForm
          size="small"
          value={formData.address2}
          onChange={handleChange}
          onBlur={() => handleBlur("address2")}
          // error={touched.address2 && !formData.address2} // Only show error if required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}> {/* Changed xs to 12 for better mobile layout */}
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text" // Changed from city
          placeholder="New York"
          autoComplete="address-level2" // More standard autocomplete
          required
          size="small"
          value={formData.city}
          onChange={handleChange}
          onBlur={() => handleBlur("city")}
          error={touched.city && !formData.city}
        />
         {touched.city && !formData.city && (
          <Alert severity="error" sx={{ mt: 1 }}>
            City is required
          </Alert>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}> {/* Changed xs to 12 */}
        <FormLabel htmlFor="state" required>
          State / Province
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="text" // Changed from state
          placeholder="NY"
          autoComplete="address-level1" // More standard autocomplete
          required
          size="small"
          value={formData.state}
          onChange={handleChange}
          onBlur={() => handleBlur("state")}
          error={touched.state && !formData.state}
        />
         {touched.state && !formData.state && (
          <Alert severity="error" sx={{ mt: 1 }}>
            State is required
          </Alert>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}> {/* Changed xs to 12 */}
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="text" // Changed from zip, inputMode="numeric" could also be useful
          placeholder="12345"
          autoComplete="postal-code"
          required
          size="small"
          value={formData.zip}
          onChange={handleChange}
          onBlur={() => handleBlur("zip")}
          error={touched.zip && !formData.zip}
        />
         {touched.zip && !formData.zip && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Zip/Postal code is required
          </Alert>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}> {/* Changed xs to 12 */}
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text" // Changed from country
          placeholder="United States"
          autoComplete="country-name"
          required
          size="small"
          value={formData.country}
          onChange={handleChange}
          onBlur={() => handleBlur("country")}
          error={touched.country && !formData.country}
        />
         {touched.country && !formData.country && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Country is required
          </Alert>
        )}
      </FormGrid>
      {/* <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="gst">GSTIN (Optional)</FormLabel>
        <OutlinedInput
          id="gst"
          name="gst"
          type="text"
          placeholder="GSTIN"
          autoComplete="off" 
          size="small"
          value={formData.gst}
          onChange={handleChange}
          onBlur={() => handleBlur("gst")}
        />
      </FormGrid> */}
    </Grid>
  );
}