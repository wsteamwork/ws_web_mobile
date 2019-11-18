import Grid from '@material-ui/core/Grid';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Toolbar/Logo';
import GridContainer from './Grid/Container';

interface IProps { }
// const facebookUrl = 'https://www.facebook.com/westay.vn/';
// const instagramUrl = 'https://www.instagram.com/westay_stayhappytogether/';

const Footer: FC<IProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      {/* <div className="firstItem">
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
                  <a
                    href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=41005"
                    target="_blank">
                    <img
                      alt="https://westay.vn"
                      src="http://online.gov.vn/seals/dlxOBO9dxLmirYHstOPHmA==.jpgx"
                    />
                  </a>
                </p>
              </ul>
            </Grid>

            <Grid item xs={12} sm={4} md={4} className={'linksList'}>
              <h5 className={'linksListGroupTitle'}>{t('layout:footer:rengulations')}</h5>
              <ul className={'linksListGroupList'}>
                <Link href="/terms-and-conditions">
                  <a className={'textTerms'}>
                    <li>{t('layout:footer:termsOfUse')}</li>
                  </a>
                </Link>
                <Link href="/privacy-policy">
                  <a className={'textTerms'}>
                    <li>{t('layout:footer:private')}</li>
                  </a>
                </Link>
              </ul>

              <div className="padding_top">
                <h5 className="linksListGroupTitle">
                  <a
                    style={{ textDecoration: 'none', color: 'white' }}
                    target="_blank"
                    href="https://blog.westay.vn">
                    {t('layout:footer:channel')}
                  </a>
                </h5>
                <ul className={'linksListGroupList'}>
                  <li>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      target="_blank"
                      href="https://blog.westay.vn/o-dau">
                      {t('layout:footer:where')}
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      target="_blank"
                      href="https://blog.westay.vn/choi-gi">
                      {t('layout:footer:playWhat')}
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      target="_blank"
                      href="https://blog.westay.vn/an-gi">
                      {t('layout:footer:eatWhat')}
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      href="https://blog.westay.vn/cam-nang-du-lich">
                      {t('layout:footer:travelGuide')}
                    </a>
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
                    color="#fff"></FontAwesomeIcon>
                  <div>
                    <a
                      href="javascript:void(0)"
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                        display: 'block',
                        marginLeft: '7px'
                      }}>
                      Hotline: 0916 374 057 - 0946 746 417
                    </a>
                    <a
                      href="javascript:void(0)"
                      style={{
                        marginLeft: '7px',
                        textDecoration: 'none',
                        color: 'white',
                        display: 'block'
                      }}>
                      {t('layout:footer:forHomeowners')} 0917 041 849
                    </a>
                  </div>
                </li>
                <li style={{ marginBottom: 7 }}>
                  <FontAwesomeIcon icon={faEnvelope} size="1x" color="#fff"></FontAwesomeIcon>
                  <a
                    style={{ textDecoration: 'none', color: 'white', marginLeft: '7px' }}
                    href="mailto:info@westay.org"
                    target="_blank">
                    info@westay.org
                  </a>
                </li>
                <li style={{ marginBottom: 8 }}>
                  <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#fff"></FontAwesomeIcon>
                  <span style={{ marginLeft: '7px' }}>{t('layout:footer:address')}</span>
                </li>
              </ul>

              <div className="padding_top">
                <h5 className="linksListGroupTitle">{t('layout:footer:socialNetwork')}</h5>
                <ul className={'socialNetwork'}>
                  <li>
                    <a href={facebookUrl} target="blank">
                      <FontAwesomeIcon icon={faFacebook} size="3x" color="#fff"></FontAwesomeIcon>
                    </a>
                  </li>
                  <li style={{ marginLeft: '1em' }}>
                    <a href={instagramUrl} target="blank">
                      <FontAwesomeIcon icon={faInstagram} size="3x" color="#fff"></FontAwesomeIcon>
                    </a>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </div> */}

      <div className={'itemMobile'}>
        <GridContainer xs={11} className="textCenter">
          <Grid style={{ marginBottom: 12 }}>
            <Logo isFooter={true} />
          </Grid>

          <Grid>
            © {new Date().getFullYear()} {t('layout:footer:rights')}
          </Grid>
        </GridContainer>
      </div>
    </div>
  );
};

export default Footer;
