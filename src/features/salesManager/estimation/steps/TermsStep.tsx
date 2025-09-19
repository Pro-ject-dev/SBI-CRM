import * as React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { TermsDetails, TermsUnit } from "../estimation.types";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface TermFormProps {
  onTermsInfoChange: (info: TermsDetails, isValid: boolean) => void;
  savedData?: TermsDetails | null;
}

export default function TermsStep({
  onTermsInfoChange,
  savedData,
}: TermFormProps) {
  const [unitList, setUnitList] = useState<TermsUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [termDetails, setTermDetails] = useState<TermsDetails>({
    termId: "",
    termTitle: "",
    termDesc: "",
  });

  // Use a ref to track whether the form has been updated
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (savedData) {
      setTermDetails(savedData);
      setSelectedUnit(savedData.termId || "");
    }
  }, []); // Only run once on mount

  // This effect runs only when bankDetails or selectedUnit changes,
  // but uses hasUpdated ref to prevent the initial render from causing an update
  useEffect(() => {
    // Skip the initial render
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      return;
    }

    const isValid =
      selectedUnit !== "" &&
      termDetails.termTitle !== "" &&
      termDetails.termDesc !== "";

    onTermsInfoChange(termDetails, isValid);
  }, [termDetails, selectedUnit]); // Remove onBankInfoChange from dependencies

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("https://sbiapi.ssengineeringworks.online/api/admin/getTerms", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) return { data: [] };
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUnitList(data);
        } else if (
          data &&
          typeof data === "object" &&
          Array.isArray(data.data)
        ) {
          setUnitList(data.data);
        } else {
          setUnitList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching units:", error);
        setUnitList([]);
      });
  }, []); // Only run once on mount

  const fetchTermDetails = useCallback(async (termId: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://sbiapi.ssengineeringworks.online/api/admin/getTermsbyId?id=${termId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        setError("No description found for the selected terms & conditions.");
        setTermDetails({
          termId: "",
          termTitle: "",
          termDesc: "",
        });
        return;
      }

      if (!response.ok)
        throw new Error(
          `API request failed with status ${response.status}: ${response.statusText}`
        );

      const data = await response.json();
      const termData = data?.data || data;

      if (termData && typeof termData === "object") {
        const newDetails: TermsDetails = {
          termId: termData.id || "",
          termTitle: termData.title || "",
          termDesc: termData.description || "",
        };
        setTermDetails(newDetails);
      } else {
        setError("Invalid data format from server.");
        setTermDetails({
          termId: "",
          termTitle: "",
          termDesc: "",
        });
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setError("Failed to fetch bank details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const termId = event.target.value;
    setSelectedUnit(termId);
    if (termId) {
      fetchTermDetails(termId);
    } else {
      setTermDetails({
        termId: "",
        termTitle: "",
        termDesc: "",
      });
    }
  };

  const handleTermNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermDetails((prev) => ({
      ...prev,
      termName: event.target.value,
    }));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormControl fullWidth>
          <FormLabel id="bank-title-label" required>
            Select Terms & Conditions
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
              Select Terms & Conditions
            </MenuItem>
            {Array.isArray(unitList) &&
              unitList.map((unit) => (
                <MenuItem key={unit.id} value={unit.id.toString()}>
                  {unit.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </FormGrid>

      {error && (
        <FormGrid item xs={12}>
          <Alert severity="warning">{error}</Alert>
        </FormGrid>
      )}

      {loading ? (
        <Grid container justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <FormGrid item xs={12} md={12}>
            <FormLabel htmlFor="bank-name" required>
              Description
            </FormLabel>
            {/* <TextField
              id="term-description"
              name="termDescription" // Use a more descriptive name
              placeholder="Description will appear here"
              required
              multiline // This is necessary for the field to be multi-line
              minRows={4} // This sets the initial height and allows it to grow
              value={termDetails.termDesc}
              onChange={handleDescriptionChange}
              // You can make this read-only if the user should not edit it
              // InputProps={{
              //   readOnly: true,
              // }}
            /> */}
            <OutlinedInput
              id="bank-name"
              name="bank-name"
              type="text"
              placeholder="Description"
              autoComplete="bank name"
              required
              value={termDetails.termDesc}
              onChange={handleTermNameChange}
              multiline
              maxRows={28} // <-- THE FIX IS HERE: Sets initial height and allows it to grow
            />
          </FormGrid>
        </>
      )}
    </Grid>
  );
}
