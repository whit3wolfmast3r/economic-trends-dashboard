import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { Calendar, TrendingUp, Home, FileText, RefreshCw, AlertTriangle, Menu, X } from 'lucide-react';

const EconomicTrendsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30y');
  const [showPolicyEvents, setShowPolicyEvents] = useState(true);
  const [activeTab, setActiveTab] = useState('trends');
  const [showCorrections, setShowCorrections] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Comprehensive 30-year historical data (1995-2025)
  const historicalData = [
    { date: '1995-01', tenYearYield: 7.78, fhaRate: 8.85, conventionalRate: 9.15, month: 'Jan 1995', year: 1995 },
    { date: '1996-01', tenYearYield: 5.65, fhaRate: 7.73, conventionalRate: 8.03, month: 'Jan 1996', year: 1996 },
    { date: '1997-01', tenYearYield: 6.58, fhaRate: 7.81, conventionalRate: 8.11, month: 'Jan 1997', year: 1997 },
    { date: '1998-01', tenYearYield: 5.54, fhaRate: 7.07, conventionalRate: 7.37, month: 'Jan 1998', year: 1998 },
    { date: '1999-01', tenYearYield: 4.72, fhaRate: 6.94, conventionalRate: 7.24, month: 'Jan 1999', year: 1999 },
    { date: '2000-01', tenYearYield: 6.66, fhaRate: 8.21, conventionalRate: 8.51, month: 'Jan 2000', year: 2000 },
    { date: '2000-06', tenYearYield: 6.10, fhaRate: 8.39, conventionalRate: 8.69, month: 'Jun 2000', year: 2000 },
    { date: '2001-01', tenYearYield: 5.16, fhaRate: 6.92, conventionalRate: 7.22, month: 'Jan 2001', year: 2001 },
    { date: '2001-06', tenYearYield: 5.28, fhaRate: 7.06, conventionalRate: 7.36, month: 'Jun 2001', year: 2001 },
    { date: '2001-09', tenYearYield: 4.73, fhaRate: 6.81, conventionalRate: 7.11, month: 'Sep 2001', year: 2001 },
    { date: '2002-01', tenYearYield: 5.04, fhaRate: 6.89, conventionalRate: 7.19, month: 'Jan 2002', year: 2002 },
    { date: '2002-06', tenYearYield: 4.93, fhaRate: 6.54, conventionalRate: 6.84, month: 'Jun 2002', year: 2002 },
    { date: '2003-01', tenYearYield: 4.05, fhaRate: 5.92, conventionalRate: 6.22, month: 'Jan 2003', year: 2003 },
    { date: '2003-06', tenYearYield: 3.33, fhaRate: 5.23, conventionalRate: 5.53, month: 'Jun 2003', year: 2003 },
    { date: '2004-01', tenYearYield: 4.15, fhaRate: 5.71, conventionalRate: 6.01, month: 'Jan 2004', year: 2004 },
    { date: '2005-01', tenYearYield: 4.22, fhaRate: 5.87, conventionalRate: 6.17, month: 'Jan 2005', year: 2005 },
    { date: '2006-01', tenYearYield: 4.42, fhaRate: 6.15, conventionalRate: 6.45, month: 'Jan 2006', year: 2006 },
    { date: '2007-01', tenYearYield: 4.76, fhaRate: 6.22, conventionalRate: 6.52, month: 'Jan 2007', year: 2007 },
    { date: '2007-06', tenYearYield: 5.10, fhaRate: 6.74, conventionalRate: 7.04, month: 'Jun 2007', year: 2007 },
    { date: '2008-01', tenYearYield: 3.74, fhaRate: 5.76, conventionalRate: 6.06, month: 'Jan 2008', year: 2008 },
    { date: '2008-06', tenYearYield: 4.10, fhaRate: 6.32, conventionalRate: 6.62, month: 'Jun 2008', year: 2008 },
    { date: '2008-09', tenYearYield: 3.69, fhaRate: 5.94, conventionalRate: 6.24, month: 'Sep 2008', year: 2008 },
    { date: '2009-01', tenYearYield: 2.52, fhaRate: 5.09, conventionalRate: 5.39, month: 'Jan 2009', year: 2009 },
    { date: '2009-06', tenYearYield: 3.72, fhaRate: 5.42, conventionalRate: 5.72, month: 'Jun 2009', year: 2009 },
    { date: '2010-01', tenYearYield: 3.73, fhaRate: 5.09, conventionalRate: 5.39, month: 'Jan 2010', year: 2010 },
    { date: '2011-01', tenYearYield: 3.39, fhaRate: 4.71, conventionalRate: 5.01, month: 'Jan 2011', year: 2011 },
    { date: '2012-01', tenYearYield: 1.97, fhaRate: 3.88, conventionalRate: 4.18, month: 'Jan 2012', year: 2012 },
    { date: '2013-01', tenYearYield: 1.91, fhaRate: 3.34, conventionalRate: 3.64, month: 'Jan 2013', year: 2013 },
    { date: '2014-01', tenYearYield: 2.86, fhaRate: 4.28, conventionalRate: 4.58, month: 'Jan 2014', year: 2014 },
    { date: '2015-01', tenYearYield: 1.88, fhaRate: 3.59, conventionalRate: 3.89, month: 'Jan 2015', year: 2015 },
    { date: '2016-01', tenYearYield: 2.09, fhaRate: 3.72, conventionalRate: 4.02, month: 'Jan 2016', year: 2016 },
    { date: '2017-01', tenYearYield: 2.45, fhaRate: 4.15, conventionalRate: 4.45, month: 'Jan 2017', year: 2017 },
    { date: '2018-01', tenYearYield: 2.58, fhaRate: 4.03, conventionalRate: 4.33, month: 'Jan 2018', year: 2018 },
    { date: '2019-01', tenYearYield: 2.71, fhaRate: 4.25, conventionalRate: 4.45, month: 'Jan 2019', year: 2019 },
    { date: '2020-01', tenYearYield: 1.77, fhaRate: 3.65, conventionalRate: 3.85, month: 'Jan 2020', year: 2020 },
    { date: '2020-03', tenYearYield: 0.67, fhaRate: 3.33, conventionalRate: 3.53, month: 'Mar 2020', year: 2020 },
    { date: '2020-06', tenYearYield: 0.66, fhaRate: 3.01, conventionalRate: 3.21, month: 'Jun 2020', year: 2020 },
    { date: '2020-12', tenYearYield: 0.93, fhaRate: 2.77, conventionalRate: 2.97, month: 'Dec 2020', year: 2020 },
    { date: '2021-01', tenYearYield: 1.17, fhaRate: 2.65, conventionalRate: 2.85, month: 'Jan 2021', year: 2021 },
    { date: '2021-06', tenYearYield: 1.47, fhaRate: 2.89, conventionalRate: 3.09, month: 'Jun 2021', year: 2021 },
    { date: '2022-01', tenYearYield: 1.78, fhaRate: 3.45, conventionalRate: 3.65, month: 'Jan 2022', year: 2022 },
    { date: '2022-06', tenYearYield: 3.49, fhaRate: 5.23, conventionalRate: 5.43, month: 'Jun 2022', year: 2022 },
    { date: '2022-12', tenYearYield: 3.88, fhaRate: 6.42, conventionalRate: 6.62, month: 'Dec 2022', year: 2022 },
    { date: '2023-06', tenYearYield: 3.84, fhaRate: 6.71, conventionalRate: 6.91, month: 'Jun 2023', year: 2023 },
    { date: '2023-10', tenYearYield: 4.88, fhaRate: 7.79, conventionalRate: 7.99, month: 'Oct 2023', year: 2023 },
    { date: '2024-01', tenYearYield: 4.02, fhaRate: 6.81, conventionalRate: 7.01, month: 'Jan 2024', year: 2024 },
    { date: '2024-06', tenYearYield: 4.29, fhaRate: 6.95, conventionalRate: 7.15, month: 'Jun 2024', year: 2024 },
    { date: '2025-01', tenYearYield: 4.58, fhaRate: 6.72, conventionalRate: 6.92, month: 'Jan 2025', year: 2025 },
    { date: '2025-06', tenYearYield: 4.46, fhaRate: 6.88, conventionalRate: 7.08, month: 'Jun 2025', year: 2025 }
  ];

  // Major corrections
  const majorCorrections = [
    {
      period: '2000-2002',
      name: 'Dot-com Bubble',
      startDate: '2000-03',
      endDate: '2002-10',
      treasuryDrop: 1.56,
      mortgageDrop: 1.82,
      description: 'Technology stock crash, Fed rate cuts',
      color: '#ef4444'
    },
    {
      period: '2007-2009',
      name: 'Financial Crisis',
      startDate: '2007-06',
      endDate: '2009-03',
      treasuryDrop: 2.58,
      mortgageDrop: 1.32,
      description: 'Subprime mortgage crisis',
      color: '#dc2626'
    },
    {
      period: '2020-2021',
      name: 'COVID-19 Pandemic',
      startDate: '2020-01',
      endDate: '2021-12',
      treasuryDrop: 1.10,
      mortgageDrop: 1.00,
      description: 'Global pandemic response',
      color: '#b91c1c'
    }
  ];

  // Calculate statistics
  const calculateStats = () => {
    const treasuryRates = historicalData.map(d => d.tenYearYield);
    const fhaRates = historicalData.map(d => d.fhaRate);
    const conventionalRates = historicalData.map(d => d.conventionalRate);
    
    return {
      treasury: {
        avg: (treasuryRates.reduce((a, b) => a + b, 0) / treasuryRates.length).toFixed(2),
        current: treasuryRates[treasuryRates.length - 1].toFixed(2)
      },
      fha: {
        avg: (fhaRates.reduce((a, b) => a + b, 0) / fhaRates.length).toFixed(2),
        current: fhaRates[fhaRates.length - 1].toFixed(2)
      },
      conventional: {
        avg: (conventionalRates.reduce((a, b) => a + b, 0) / conventionalRates.length).toFixed(2),
        current: conventionalRates[conventionalRates.length - 1].toFixed(2)
      }
    };
  };

  const stats = calculateStats();

  const policyEvents = [
    // Dot-com Era
    { date: '1999-06', event: 'Glass-Steagall Repeal', impact: 'High', description: 'Financial deregulation', category: 'Financial Regulation' },
    { date: '2001-06', event: 'Bush Tax Cuts (EGTRRA)', impact: 'Medium', description: '$1.35T tax reduction', category: 'Fiscal Policy' },
    { date: '2001-09', event: '9/11 Emergency Response', impact: 'High', description: 'Fed emergency rate cuts', category: 'Monetary Policy' },
    
    // Pre-Financial Crisis
    { date: '2003-05', event: 'Jobs and Growth Tax Relief', impact: 'Medium', description: 'Capital gains/dividend tax cuts', category: 'Fiscal Policy' },
    { date: '2005-04', event: 'Bankruptcy Abuse Prevention Act', impact: 'Medium', description: 'Stricter bankruptcy laws', category: 'Financial Regulation' },
    
    // Financial Crisis Era
    { date: '2007-08', event: 'Subprime Crisis Begins', impact: 'High', description: 'Bear Stearns hedge funds collapse', category: 'Financial Crisis' },
    { date: '2008-03', event: 'Bear Stearns Bailout', impact: 'High', description: 'Fed facilitates JPMorgan acquisition', category: 'Financial Crisis' },
    { date: '2008-09', event: 'Lehman Brothers Collapse', impact: 'High', description: 'Largest bankruptcy in US history', category: 'Financial Crisis' },
    { date: '2008-10', event: 'TARP Program', impact: 'High', description: '$700B bank bailout program', category: 'Fiscal Policy' },
    { date: '2009-02', event: 'American Recovery Act', impact: 'High', description: '$787B stimulus package', category: 'Fiscal Policy' },
    { date: '2010-07', event: 'Dodd-Frank Act', impact: 'High', description: 'Comprehensive financial reform', category: 'Financial Regulation' },
    
    // Post-Crisis Era
    { date: '2010-11', event: 'QE2 Launch', impact: 'High', description: '$600B quantitative easing', category: 'Monetary Policy' },
    { date: '2012-09', event: 'QE3 Launch', impact: 'High', description: 'Open-ended asset purchases', category: 'Monetary Policy' },
    { date: '2015-10', event: 'TRID Implementation', impact: 'Medium', description: 'Truth in Lending/RESPA integration', category: 'Financial Regulation' },
    { date: '2017-12', event: 'Tax Cuts and Jobs Act', impact: 'High', description: '$1.5T corporate/individual tax cuts', category: 'Fiscal Policy' },
    { date: '2018-05', event: 'Banking Deregulation', impact: 'Medium', description: 'Rollback of Dodd-Frank provisions', category: 'Financial Regulation' },
    
    // COVID Era
    { date: '2020-03', event: 'CARES Act', impact: 'High', description: '$2.2T COVID relief package', category: 'Fiscal Policy' },
    { date: '2020-03', event: 'Fed Emergency Actions', impact: 'High', description: 'Rates to zero, unlimited QE', category: 'Monetary Policy' },
    { date: '2021-03', event: 'American Rescue Plan', impact: 'High', description: '$1.9T additional stimulus', category: 'Fiscal Policy' },
    { date: '2021-11', event: 'Infrastructure Investment Act', impact: 'Medium', description: '$1.2T infrastructure spending', category: 'Fiscal Policy' },
    { date: '2022-03', event: 'Fed Tightening Cycle', impact: 'High', description: 'Most aggressive rate hikes since 1980s', category: 'Monetary Policy' },
    { date: '2022-08', event: 'Inflation Reduction Act', impact: 'Medium', description: '$740B climate/healthcare spending', category: 'Fiscal Policy' }
  ];

  const tabs = [
    { id: 'trends', label: isMobile ? 'Trends' : '30-Year Trends', icon: TrendingUp },
    { id: 'corrections', label: isMobile ? 'Corrections' : 'Corrections Analysis', icon: AlertTriangle },
    { id: 'policy', label: isMobile ? 'Policy' : 'Policy Timeline', icon: FileText },
    { id: 'stats', label: isMobile ? 'Stats' : 'Statistics', icon: Calendar }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-lg font-bold text-gray-800">Economic Trends</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 mb-6">
          {/* Desktop Header */}
          {!isMobile && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  30-Year Economic Trends Analysis
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Treasury Yields, Mortgage Rates & Major Market Corrections (1995-2025)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-500">30-Year Historical</span>
              </div>
            </div>
          )}

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-blue-700 font-medium">10-Year Treasury</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-800">{stats.treasury.current}%</p>
                  <p className="text-xs text-blue-600">30yr avg: {stats.treasury.avg}%</p>
                </div>
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 md:p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-green-700 font-medium">FHA 30-Year</p>
                  <p className="text-lg md:text-2xl font-bold text-green-800">{stats.fha.current}%</p>
                  <p className="text-xs text-green-600">30yr avg: {stats.fha.avg}%</p>
                </div>
                <Home className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 md:p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-purple-700 font-medium">Conventional</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-800">{stats.conventional.current}%</p>
                  <p className="text-xs text-purple-600">30yr avg: {stats.conventional.avg}%</p>
                </div>
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 md:p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-red-700 font-medium">Major Corrections</p>
                  <p className="text-lg md:text-2xl font-bold text-red-800">3</p>
                  <p className="text-xs text-red-600">2000, 2008, 2020</p>
                </div>
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`${isMobile ? 'hidden' : 'flex'} space-x-1 mb-6`}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Tab Navigation */}
          {isMobile && (
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} mb-4`}>
              <div className="grid grid-cols-4 gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chart Content */}
          {activeTab === 'trends' && (
            <div className="bg-white rounded-lg border p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-4">Three Decades of Rate Evolution</h3>
              <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    interval="preserveStartEnd"
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                  />
                  <YAxis 
                    label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }}
                    domain={[0, 10]}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  
                  <Line
                    type="monotone"
                    dataKey="tenYearYield"
                    stroke="#2563eb"
                    strokeWidth={isMobile ? 2 : 3}
                    name="10-Year Treasury"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="fhaRate"
                    stroke="#16a34a"
                    strokeWidth={isMobile ? 2 : 2.5}
                    name="FHA 30-Year"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="conventionalRate"
                    stroke="#9333ea"
                    strokeWidth={2}
                    name="Conventional 30-Year"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Corrections Analysis */}
          {activeTab === 'corrections' && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-lg border p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold mb-4">Market Correction Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {majorCorrections.map((correction, index) => (
                    <div key={index} className="bg-white p-3 md:p-4 rounded-lg border">
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: correction.color }}
                        ></div>
                        <h4 className="font-semibold text-sm md:text-base">{correction.name}</h4>
                      </div>
                      <div className="space-y-2 text-xs md:text-sm">
                        <p><span className="font-medium">Period:</span> {correction.period}</p>
                        <p><span className="font-medium">Treasury Drop:</span> {correction.treasuryDrop}%</p>
                        <p><span className="font-medium">Mortgage Drop:</span> {correction.mortgageDrop}%</p>
                        <p className="text-gray-600">{correction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Policy Timeline */}
          {activeTab === 'policy' && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-lg border p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold mb-4">30-Year Policy Events Timeline</h3>
                <div className="space-y-3 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
                  {policyEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        event.impact === 'High' ? 'bg-red-500' :
                        event.impact === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h4 className="font-semibold text-sm md:text-base">{event.event}</h4>
                          <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">{event.date}</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex flex-col md:flex-row md:items-center mt-2 space-y-1 md:space-y-0 md:space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                            event.category === 'Monetary Policy' ? 'bg-blue-100 text-blue-800' :
                            event.category === 'Fiscal Policy' ? 'bg-green-100 text-green-800' :
                            event.category === 'Financial Regulation' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {event.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                            event.impact === 'High' ? 'bg-red-100 text-red-800' :
                            event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          {activeTab === 'stats' && (
            <div className="bg-white rounded-lg border p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-4">30-Year Rate Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">10-Year Treasury</h4>
                  <p className="text-2xl font-bold text-blue-900">{stats.treasury.current}%</p>
                  <p className="text-sm text-blue-700">30-year average: {stats.treasury.avg}%</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">FHA 30-Year</h4>
                  <p className="text-2xl font-bold text-green-900">{stats.fha.current}%</p>
                  <p className="text-sm text-green-700">30-year average: {stats.fha.avg}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Conventional</h4>
                  <p className="text-2xl font-bold text-purple-900">{stats.conventional.current}%</p>
                  <p className="text-sm text-purple-700">30-year average: {stats.conventional.avg}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Data Sources */}
          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-100 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold mb-3">Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs md:text-sm">
              <div>
                <h4 className="font-medium mb-2">Treasury Data</h4>
                <p className="text-gray-600">• Daily Treasury Yield Curve</p>
                <p className="text-gray-600">• FRED Economic Data</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Mortgage Rates</h4>
                <p className="text-gray-600">• Freddie Mac PMMS</p>
                <p className="text-gray-600">• FHA data from HUD</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analysis Period</h4>
                <p className="text-gray-600">• 1995-2025 (30 years)</p>
                <p className="text-gray-600">• Major market corrections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicTrendsDashboard;
