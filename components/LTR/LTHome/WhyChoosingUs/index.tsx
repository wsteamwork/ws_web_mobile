import CardSimpleWithIcon from "@/components/Cards/CardSimpleWithIcon";
import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { FC, Fragment } from "react";

interface IProps { };

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
    createStyles({
        headTitle: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: '1.505rem',
            letterSpacing: '-0.6px',
            color: 'inherit',
            margin: '0px',
            padding: '0px'
        },
        headTitleContainer: {
            paddingLeft: '1.5rem',
            marginBottom: '1.1rem',
            WebkitBoxAlign: 'baseline',
            WebkitBoxPack: 'justify',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            display: 'inline-flex'
        },
        cardBase: {
            background: 'red',
            height: '8rem',
            borderRadius: '0.5rem'
        },
        container: {
            whiteSpace: 'nowrap',
            marginTop: '0px',
            padding: '0 1rem',
            margin: '0 !important'
        },
        componentWrapper: {
            marginTop: '1rem'
        }
    })
);

const WhyChoosingUs: FC<IProps> = (props) => {
    const classes = useStyles(props)
    return (
        <Fragment>
            <Grid container className={classes.componentWrapper}>
                <Grid className={classes.headTitleContainer}>
                    <Typography className={classes.headTitle}>Why you choosing us</Typography>
                </Grid>
                <Grid container spacing={1} className={classes.container}>
                    <CardSimpleWithIcon data={{ imageIcon: '/static/icons/search.svg', title: 'something', subtitle: 'something else' }} />
                    <CardSimpleWithIcon data={{ imageIcon: '/static/icons/search.svg', title: 'something', subtitle: 'something else' }} />
                    <CardSimpleWithIcon data={{ imageIcon: '/static/icons/search.svg', title: 'something', subtitle: 'something else' }} />
                    <CardSimpleWithIcon data={{ imageIcon: '/static/icons/search.svg', title: 'something', subtitle: 'something else' }} />

                </Grid>
            </Grid>
        </Fragment>
    )
}

export default WhyChoosingUs;
