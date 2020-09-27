import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";

function CategoryEditDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, callbackUpdate } = props;

  const initialFValues = {
    title: title ? title : "Category Title",
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title =
        fieldValues.title && title !== fieldValues.title
          ? ""
          : "This field is required.";

    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = () => {
    if (!validate()) {
      setErrors({
        ...errors,
        title: "This field is required",
      });
      return;
    }
    callbackUpdate(values.title);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen} color="primary">
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Category Name</DialogContentText>
          <Controls.Input
            name="title"
            label="Title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryEditDialog;
