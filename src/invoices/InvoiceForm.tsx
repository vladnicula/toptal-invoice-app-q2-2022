import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Autocomplete, Box, Button, Container, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import { CompanyPickerContainer } from "./CompanyPickerContainer";

const InvoiceItemSchema = yup.object({
    description: yup.string().required("item description is required"),
    quantity: yup.number().default(1).min(1).typeError("quantity must be a positive"),
    price: yup.number().required().typeError("price must be a positive")
})

type InvoiceItemSchemaData = yup.InferType<typeof InvoiceItemSchema>

const InvoiceFormSchema = yup.object({
    number: yup.string().required(),
    projectCode: yup.string(),
    items: yup.array().of(InvoiceItemSchema).required().min(1)
})

export interface InvoiceFormData extends Omit<yup.InferType<typeof InvoiceFormSchema>, 'items'> {
    items: InvoiceItemSchemaData[]
}

export type InvoiceCreateProps = {
    genericError?: string;
    initialValues?: InvoiceFormData;
    onInvoiceSubmitRequest: (data: InvoiceFormData) => unknown
}

export const InvoiceForm = (props: InvoiceCreateProps) => {

    const { control, register, handleSubmit, formState: { errors } } = useForm<InvoiceFormData>({ 
        mode: "onBlur",
        resolver: yupResolver(InvoiceFormSchema),
        defaultValues: {
            ...props.initialValues,
            items: props.initialValues ? props.initialValues.items : [{}]
        }
    });

    const { fields: items, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                { props.genericError ? <Alert severity="error">{props.genericError}</Alert> : null}
                <Box component="form" onSubmit={handleSubmit(props.onInvoiceSubmitRequest)} noValidate sx={{ mt: 1 }}>

                    <Box sx={{
                        padding: 2,
                        mb: 1,
                        border: '1px solid #aaa'
                    }}>
                        <Typography variant='h5'>Main Details</Typography>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={4}>
                                <TextField 
                                    margin="dense" 
                                    size='small'
                                    id="invoice-number"
                                    label="Invocie Number"
                                    inputProps={{"data-test": "invoice-number"  }}
                                    {...register("number")}
                                    error={!!errors.number}
                                    helperText={errors.number?.message}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField 
                                    margin="dense" 
                                    size='small'
                                    id="invoice-project-code"
                                    label="Project Code"
                                    inputProps={{"data-test": "invoice-project-code"  }}
                                    {...register("projectCode")}
                                    error={!!errors.projectCode}
                                    helperText={errors.projectCode?.message}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* <Controller
                                name="companyId"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <CompanyPickerContainer
                                        pickedCompanyId={field.value}
                                        onPickCompany={(value) => {
                                            field.onChange(value)
                                        }}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params}  
                                                margin="dense" 
                                                size='small'
                                                label="Company" 
                                                error={!!errors.companyId}
                                                helperText={errors.companyId?.message}
                                            />
                                        )}
                                    />
                                )}
                            /> */}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{
                        padding: 2,
                        border: '1px solid #aaa'
                    }}>
                        <Typography variant='h5'>Items</Typography>
                                       

                        { !items.length && errors.items && !errors.items.length ? <Alert severity="error">{(errors.items as any).message}</Alert> : null}
                    
                        {items.map((field, index) => (
                            <Box
                                key={field.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: 2,
                                    padding: 2
                                }}
                            >
                                <IconButton 
                                    sx={{
                                        mt: -3
                                    }}
                                    aria-label="delete" 
                                    disabled={items.length === 1}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        remove(index);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <TextField 
                                    size="small"
                                    sx={{
                                        flex: 1,
                                        m: 0
                                    }}
                                    margin="dense"
                                    id="name"
                                    label="description"
                                    inputProps={{...register(`items.${index}.description`), 'data-test': `invoice-item-${index}-description`} }
                                    error={!!errors.items?.[index]?.description ?? false}
                                    helperText={errors.items?.[index]?.description?.message ?? " "}
                                
                                />
                                <TextField 
                                    size="small"
                                    sx={{
                                        flex: 1,
                                        m: 0
                                    }}
                                    margin="dense"
                                    id="quantity"
                                    label="quantity"
                                    inputProps={{...register(`items.${index}.quantity`), 'data-test': `invoice-item-${index}-quantity`} }
                                    error={!!errors.items?.[index]?.quantity}
                                    helperText={errors.items?.[index]?.quantity?.message ?? " "}
                                
                                />
                                <TextField 
                                    sx={{
                                        flex: 1,
                                        m: 0
                                    }}
                                    size="small"
                                    margin="dense" 
                                    id="price"
                                    label="price"
                                    inputProps={{...register(`items.${index}.price`), 'data-test': `invoice-item-${index}-price`} }
                                    error={!!errors.items?.[index]?.price}
                                    helperText={errors.items?.[index]?.price?.message ?? " "}
                                />
                            </Box>
                        ))}

                        <Button
                            onClick={(ev) => {
                                ev.preventDefault();
                                append({})
                            }}
                            startIcon={<AddIcon/>}
                        >
                        Add Row
                        </Button>

                    </Box>


                    <br/>
                    <Box mt={2}>
                        <Button 
                            type="submit"
                            variant="contained"
                        >
                            Create  
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

