import { PortalDr2cBerryFePage } from './app.po';

describe('portal-dr2c-berry-fe App', () => {
  let page: PortalDr2cBerryFePage;

  beforeEach(() => {
    page = new PortalDr2cBerryFePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to berry!!');
  });
});
