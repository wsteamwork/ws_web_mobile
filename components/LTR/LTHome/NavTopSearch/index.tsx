import SearchInput from '@/components/LTR/ReusableComponents/SearchInput';
import SearchDialog from '@/components/SearchDialog';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment } from 'react';

interface IProps {
    classes?: any;
    isHidden?: boolean;
    showLeftButton?: boolean;
    handleLeftButtonAction?: () => void;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
    createStyles({
        boxWrapper: {
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto'
        },
        textCenter: {
            fontSize: '1.05rem',
            fontWeight: 'bold'
        },
        boxLeft: {
            color: '#969696'
        }
    })
);
const NavTopSearch: FC<IProps> = (props) => {
    const classes = useStyles(props);
    const [openSearchDialog, setOpenSearchDialog] = React.useState<boolean>(false);
    const handleOpenSearchDialog = () => {
        setOpenSearchDialog(true);
    };

    const handleCloseSearchDialog = () => {
        setOpenSearchDialog(false);
    };
    const {
        isHidden,
        showLeftButton,
        handleLeftButtonAction
    } = props;
    return !isHidden ? (
        <Fragment>
            <Grid container item xs={11} className={classes.boxWrapper} spacing={2}>
                <Grid item xs={12}>
                    <SearchInput displayOnlyForModal onClick={handleOpenSearchDialog}></SearchInput>
                </Grid>
            </Grid>
            <SearchDialog handleClose={handleCloseSearchDialog} open={openSearchDialog} />
        </Fragment>
    ) : (
            <Fragment></Fragment>
        );
};
NavTopSearch.defaultProps = {
    isHidden: false,
    showLeftButton: true
};
export default NavTopSearch;