import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import GridContainer from './Grid/Container';
import { Link, Hidden } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faEnvelope, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Logo from '../Toolbar/Logo';

interface IProps { }
const facebookUrl = 'https://www.facebook.com/westay.vn/';
const instagramUrl = 'https://www.instagram.com/westay_stayhappytogether/';

const Footer: FC<IProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <Hidden smDown>
        <div className="firstItem">
          <GridContainer xs={11}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4} className={'linksList'}>
                <h5 className={'linksListGroupTitle'}>{t('layout:footer:help')}</h5>

                <ul className={'linksListGroupList'}>
                  <p>
                    <strong>{t('layout:footer:nameCompany')}</strong>
                    <br /> <strong>{t('layout:footer:contact')} </strong> 0941 983 046
                    <br />
                    <strong>{t('layout:footer:business')} </strong>
                    {t('layout:footer:ecommerce')}
                    <br />
                    <strong>{t('layout:footer:domain')} </strong>
                    <strong>{t('layout:footer:typeWeb')} </strong>
                    {t('layout:footer:ecommerce')}
                  </p>{' '}
                  <p className="padding_top">
                    <Link
                      color="inherit"
                      href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=41005"
                      target="_blank">
                      <img
                        alt="https://westay.vn"
                        src="http://online.gov.vn/seals/dlxOBO9dxLmirYHstOPHmA==.jpgx"
                      />
                    </Link>
                  </p>
                </ul>
              </Grid>

              <Grid item xs={12} sm={4} md={4} className={'linksList'}>
                <h5 className={'linksListGroupTitle'}>{t('layout:footer:rengulations')}</h5>
                <ul className={'linksListGroupList'}>
                  <Link color="inherit" href="/terms-and-conditions" className={'textTerms'}>
                    {t('layout:footer:termsOfUse')}
                  </Link>
                  <Link color="inherit" href="/privacy-policy" className={'textTerms'}>
                    {t('layout:footer:private')}
                  </Link>
                </ul>

                <div className="padding_top">
                  <h5 className="linksListGroupTitle">
                    <Link
                      color="inherit"
                      // style={{ textDecoration: 'none' }}
                      target="_blank"
                      href="https://blog.westay.vn">
                      {t('layout:footer:channel')}
                    </Link>
                  </h5>
                  <ul className={'linksListGroupList'}>
                    <li>
                      <Link
                        color="inherit"
                        // style={{ textDecoration: 'none' }}
                        target="_blank"
                        href="https://blog.westay.vn/o-dau">
                        {t('layout:footer:where')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="inherit"
                        // style={{ textDecoration: 'none', color: 'white' }}
                        target="_blank"
                        href="https://blog.westay.vn/choi-gi">
                        {t('layout:footer:playWhat')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="inherit"
                        // style={{ textDecoration: 'none', color: 'white' }}
                        target="_blank"
                        href="https://blog.westay.vn/an-gi">
                        {t('layout:footer:eatWhat')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="inherit"
                        style={{ textDecoration: 'none', color: 'white' }}
                        href="https://blog.westay.vn/cam-nang-du-lich">
                        {t('layout:footer:travelGuide')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} className={'linksList'}>
                <h5 className={'linksListGroupTitle'}> {t('layout:footer:contactUs')}</h5>
                <ul className={'linksListGroupList'}>
                  <li style={{ marginBottom: 8, display: 'flex' }}>
                    <FontAwesomeIcon
                      style={{ marginTop: '8px' }}
                      icon={faPhoneVolume}
                      size="1x"
                      color="#484848"></FontAwesomeIcon>
                    <div>
                      <Link
                        color="inherit"
                        href="javascript:void(0)"
                        style={{
                          display: 'block',
                          marginLeft: '7px'
                        }}>
                        Hotline: 0916 374 057 - 0946 746 417
                      </Link>
                      <Link
                        color="inherit"
                        href="javascript:void(0)"
                        style={{
                          marginLeft: '7px',
                          display: 'block'
                        }}>
                        {t('layout:footer:forHomeowners')} 0917 041 849
                      </Link>
                    </div>
                  </li>
                  <li style={{ marginBottom: 7 }}>
                    <FontAwesomeIcon icon={faEnvelope} size="1x" color="#484848"></FontAwesomeIcon>
                    <Link
                      color="inherit"
                      style={{ marginLeft: '7px' }}
                      href="mailto:info@westay.vn"
                      target="_blank">
                      info@westay.vn
                    </Link>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      size="1x"
                      color="#484848"></FontAwesomeIcon>
                    <span style={{ marginLeft: '7px' }}>{t('layout:footer:address')}</span>
                  </li>
                </ul>

                <div className="padding_top">
                  <h5 className="linksListGroupTitle">{t('layout:footer:socialNetwork')}</h5>
                  <ul className={'socialNetwork'}>
                    <li>
                      <Link href={facebookUrl} target="blank">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          size="3x"
                          color="#484848"></FontAwesomeIcon>
                      </Link>
                    </li>
                    <li style={{ marginLeft: '1em' }}>
                      <Link href={instagramUrl} target="blank">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          size="3x"
                          color="#484848"></FontAwesomeIcon>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>

        <div className={'secondItem'}>
          <GridContainer xs={11}>
            <Grid container>
              <Grid item xs={12} sm={6} className={'rowFooter'}>
                <Paper elevation={0} className={classNames('paper', 'textLeft')}>
                  © {new Date().getFullYear()} {t('layout:footer:rights')}
                </Paper>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={'itemMobile'}>
          <GridContainer xs={11} className="textCenter">
            <Grid style={{ marginBottom: 12 }}>
              <Logo isFooter={true} />
            </Grid>

            <Grid style={{ fontSize: 16 }}>
              © {new Date().getFullYear()} {t('layout:footer:rights')}
            </Grid>
          </GridContainer>
        </div>
      </Hidden>
    </div>
  );
};

export default Footer;
