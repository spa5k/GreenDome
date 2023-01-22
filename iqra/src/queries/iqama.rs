use islam::pray::{
    error::Error, Config, Location, Madhab, Method, Prayer, PrayerSchedule, PrayerTimes,
};
use time::macros::date;
use time::Date;

pub struct PrayerParameters {
    pub date: Date,
    pub location: Location,
    pub madhab_type: Madhab,
    pub time_calculation_method: Method,
}

impl Default for PrayerParameters {
    fn default() -> Self {
        Self {
            date: date!(2023 - 01 - 19),
            location: Location::new(9.1099, 7.4042, 1), //Location of Gwarinpa
            madhab_type: Madhab::Shafi,
            time_calculation_method: Method::Egyptian,
        }
    }
}

fn all_prayer_time() -> Result<PrayerTimes, Error> {
    //let date  = Utc.ymd(2019, 1, 25);
    // https://www.mapcoordinates.net/en
    let config = Config::new().with(
        PrayerParameters::default().time_calculation_method,
        PrayerParameters::default().madhab_type,
    );
    let prayer_times = PrayerSchedule::new(PrayerParameters::default().location)?
        .on(PrayerParameters::default().date)
        .with_config(config)
        .calculate()?;

    Ok(prayer_times)
}

fn next_prayer_time() -> Result<Prayer, Error> {
    let config = Config::new().with(
        PrayerParameters::default().time_calculation_method,
        PrayerParameters::default().madhab_type,
    );
    let ptimes = PrayerTimes::new(
        PrayerParameters::default().date,
        PrayerParameters::default().location,
        config,
    )?;

    let nextprayer = ptimes.next().unwrap();
    Ok(nextprayer)
}
