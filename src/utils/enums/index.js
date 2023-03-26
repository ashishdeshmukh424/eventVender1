const enums = {
  APP_TYPES: {
    STORE_SERVER: 'STORE_SERVER',
    POS: 'POS',
    STOCK_MANAGEMENT: 'STOCK_MANAGEMENT',
    SCHEDULER: 'SCHEDULER',
  },
  SETTING_OPTIONS: [{ key: 'manufactured', value: 'Manufactured' },
    { key: 'controllable', value: 'Controllable' },
    { key: 'vatExempt', value: 'Vat Exempt' },
    { key: 'showThresholdOnPosApp', value: 'Show Low Stock Alert' },
    { key: 'isReportItem', value: 'Show On Reports' }],

  REPORT_NAME: {
    GROSS_PROFIT: 'GROSS_PROFIT',
  },

};

export default enums;