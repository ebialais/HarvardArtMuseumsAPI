import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import './Table.css';
import getDate from '../../Util/getDate';
import Fab from '@material-ui/core/Fab';

const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

function TablePag(props) {
    const { updatePage, pageInit, items, totalPages } = props
    const classes = useStyles2();
    
    function goPreviousPageTable(){
        let newPage = pageInit - 1
        updatePage(newPage)
        window.scrollTo({
            top: 0, 
            left: 0,
            behavior: 'smooth'
        })
    }
    function goNextPageTable(){
        let newPage = pageInit + 1
        updatePage(newPage)
        window.scrollTo({
            top: 0, 
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table  className={classes.table}>
                    <TableBody>
                        {items === [] ? <div><Loader /></div> : items.map(item => (
                            <TableRow key={ item.id } hover={ true } className="TableRow" >
                                    <TableCell align="right"  >
                                        <Link to={{pathname: `/Infos/${pageInit}/${item.id}`}} className="routeInfos">
                                            {getDate(item.dates.start.localDate)}
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row" className="middleCell">
                                        <Link to={{pathname: `/Infos/${pageInit}/${item.id}`}} className="routeInfos">
                                            <div id="name">{item.name}</div>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right" className="lastCell" >
                                        <Link to={{pathname: `/Infos/${pageInit}/${item.id}`}} className="routeInfos">
                                            <div id="divImg">
                                                { item.images && item.images.length > 0 ? 
                                                <img src={item.images[0].url}  id="imageCell" alt={item.name} /> : 
                                                "Pas d'image" }
                                            </div>
                                        </Link>
                                    </TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow id="paginationRow">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell id="paginationCell">
                                <Link to={`/${parseInt(pageInit) - 1}`} >
                                    <Fab 
                                        onClick={() => goPreviousPageTable()} 
                                        className="tabButton" 
                                        disabled={pageInit === 0}
                                    >
                                        <img src="/assets/backIcon.svg" />
                                    </Fab>
                                </Link>
                                <div>{parseInt(pageInit) + 1}</div>
                                <Link to={`/${parseInt(pageInit) + 1}`} >
                                    <Fab 
                                        onClick={() => goNextPageTable()} 
                                        className="tabButton"
                                        disabled={parseInt(pageInit) + 1 === totalPages}
                                    >
                                        <img src="/assets/nextIcon.svg" />
                                    </Fab>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </Paper>
    );
}

export default TablePag;
