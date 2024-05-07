import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';

export default function FontStylesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.text, {fontFamily: 'San Francisco'}]}>
        San Francisco
      </Text>
      <Text style={[styles.text, {fontFamily: 'Academy Engraved LET'}]}>
        Academy Engraved LET
      </Text>
      <Text style={[styles.text, {fontFamily: 'AcademyEngravedLetPlain'}]}>
        AcademyEngravedLetPlain
      </Text>
      <Text style={[styles.text, {fontFamily: 'Al Nile'}]}>Al Nile</Text>
      <Text style={[styles.text, {fontFamily: 'AlNile-Bold'}]}>
        AlNile-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'American Typewriter'}]}>
        American Typewriter
      </Text>
      <Text style={[styles.text, {fontFamily: 'AmericanTypewriter-Bold'}]}>
        AmericanTypewriter-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'AmericanTypewriter-Condensed'}]}>
        AmericanTypewriter-Condensed
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'AmericanTypewriter-CondensedBold'}]}>
        AmericanTypewriter-CondensedBold
      </Text>
      <Text
        style={[
          styles.text,
          {fontFamily: 'AmericanTypewriter-CondensedLight'},
        ]}>
        AmericanTypewriter-CondensedLight
      </Text>
      <Text style={[styles.text, {fontFamily: 'AmericanTypewriter-Light'}]}>
        AmericanTypewriter-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Apple Color Emoji'}]}>
        Apple Color Emoji
      </Text>
      <Text style={[styles.text, {fontFamily: 'Apple SD Gothic Neo'}]}>
        Apple SD Gothic Neo
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleColorEmoji'}]}>
        AppleColorEmoji
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-Bold'}]}>
        AppleSDGothicNeo-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-Light'}]}>
        AppleSDGothicNeo-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-Medium'}]}>
        AppleSDGothicNeo-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-Regular'}]}>
        AppleSDGothicNeo-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-SemiBold'}]}>
        AppleSDGothicNeo-SemiBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-Thin'}]}>
        AppleSDGothicNeo-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'AppleSDGothicNeo-UltraLight'}]}>
        AppleSDGothicNeo-UltraLight
      </Text>
      <Text style={[styles.text, {fontFamily: 'Arial'}]}>Arial</Text>
      <Text style={[styles.text, {fontFamily: 'Arial Hebrew'}]}>
        Arial Hebrew
      </Text>
      <Text style={[styles.text, {fontFamily: 'Arial Rounded MT Bold'}]}>
        Arial Rounded MT Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Arial-BoldItalicMT'}]}>
        Arial-BoldItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'Arial-BoldMT'}]}>
        Arial-BoldMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'Arial-ItalicMT'}]}>
        Arial-ItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'ArialHebrew'}]}>
        ArialHebrew
      </Text>
      <Text style={[styles.text, {fontFamily: 'ArialHebrew-Bold'}]}>
        ArialHebrew-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'ArialHebrew-Light'}]}>
        ArialHebrew-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'ArialMT'}]}>ArialMT</Text>
      <Text style={[styles.text, {fontFamily: 'ArialRoundedMTBold'}]}>
        ArialRoundedMTBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir'}]}>Avenir</Text>
      <Text style={[styles.text, {fontFamily: 'Avenir Next'}]}>
        Avenir Next
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir Next Condensed'}]}>
        Avenir Next Condensed
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Black'}]}>
        Avenir-Black
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-BlackOblique'}]}>
        Avenir-BlackOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Book'}]}>
        Avenir-Book
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-BookOblique'}]}>
        Avenir-BookOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Heavy'}]}>
        Avenir-Heavy
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-HeavyOblique'}]}>
        Avenir-HeavyOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Light'}]}>
        Avenir-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-LightOblique'}]}>
        Avenir-LightOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Medium'}]}>
        Avenir-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-MediumOblique'}]}>
        Avenir-MediumOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Oblique'}]}>
        Avenir-Oblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Avenir-Roman'}]}>
        Avenir-Roman
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-Bold'}]}>
        AvenirNext-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-BoldItalic'}]}>
        AvenirNext-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-DemiBold'}]}>
        AvenirNext-DemiBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-DemiBoldItalic'}]}>
        AvenirNext-DemiBoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-Heavy'}]}>
        AvenirNext-Heavy
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-HeavyItalic'}]}>
        AvenirNext-HeavyItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-Italic'}]}>
        AvenirNext-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-Medium'}]}>
        AvenirNext-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-MediumItalic'}]}>
        AvenirNext-MediumItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-Regular'}]}>
        AvenirNext-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-UltraLight'}]}>
        AvenirNext-UltraLight
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNext-UltraLightItalic'}]}>
        AvenirNext-UltraLightItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-Bold'}]}>
        AvenirNextCondensed-Bold
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'AvenirNextCondensed-BoldItalic'}]}>
        AvenirNextCondensed-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-DemiBold'}]}>
        AvenirNextCondensed-DemiBold
      </Text>
      <Text
        style={[
          styles.text,
          {fontFamily: 'AvenirNextCondensed-DemiBoldItalic'},
        ]}>
        AvenirNextCondensed-DemiBoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-Heavy'}]}>
        AvenirNextCondensed-Heavy
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'AvenirNextCondensed-HeavyItalic'}]}>
        AvenirNextCondensed-HeavyItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-Italic'}]}>
        AvenirNextCondensed-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-Medium'}]}>
        AvenirNextCondensed-Medium
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'AvenirNextCondensed-MediumItalic'}]}>
        AvenirNextCondensed-MediumItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'AvenirNextCondensed-Regular'}]}>
        AvenirNextCondensed-Regular
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'AvenirNextCondensed-UltraLight'}]}>
        AvenirNextCondensed-UltraLight
      </Text>
      <Text
        style={[
          styles.text,
          {fontFamily: 'AvenirNextCondensed-UltraLightItalic'},
        ]}>
        AvenirNextCondensed-UltraLightItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Bangla Sangam MN'}]}>
        Bangla Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville'}]}>
        Baskerville
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville-Bold'}]}>
        Baskerville-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville-BoldItalic'}]}>
        Baskerville-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville-Italic'}]}>
        Baskerville-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville-SemiBold'}]}>
        Baskerville-SemiBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Baskerville-SemiBoldItalic'}]}>
        Baskerville-SemiBoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Bodoni 72'}]}>Bodoni 72</Text>
      <Text style={[styles.text, {fontFamily: 'Bodoni 72 Oldstyle'}]}>
        Bodoni 72 Oldstyle
      </Text>
      <Text style={[styles.text, {fontFamily: 'Bodoni 72 Smallcaps'}]}>
        Bodoni 72 Smallcaps
      </Text>
      <Text style={[styles.text, {fontFamily: 'Bodoni Ornaments'}]}>
        Bodoni Ornaments
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniOrnamentsITCTT'}]}>
        BodoniOrnamentsITCTT
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoITCTT-Bold'}]}>
        BodoniSvtyTwoITCTT-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoITCTT-Book'}]}>
        BodoniSvtyTwoITCTT-Book
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoITCTT-BookIta'}]}>
        BodoniSvtyTwoITCTT-BookIta
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoOSITCTT-Bold'}]}>
        BodoniSvtyTwoOSITCTT-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoOSITCTT-Book'}]}>
        BodoniSvtyTwoOSITCTT-Book
      </Text>
      <Text style={[styles.text, {fontFamily: 'BodoniSvtyTwoSCITCTT-Book'}]}>
        BodoniSvtyTwoSCITCTT-Book
      </Text>
      <Text style={[styles.text, {fontFamily: 'Bradley Hand'}]}>
        Bradley Hand
      </Text>
      <Text style={[styles.text, {fontFamily: 'BradleyHandITCTT-Bold'}]}>
        BradleyHandITCTT-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Chalkboard SE'}]}>
        Chalkboard SE
      </Text>
      <Text style={[styles.text, {fontFamily: 'ChalkboardSE-Bold'}]}>
        ChalkboardSE-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'ChalkboardSE-Light'}]}>
        ChalkboardSE-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'ChalkboardSE-Regular'}]}>
        ChalkboardSE-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'Chalkduster'}]}>
        Chalkduster
      </Text>
      <Text style={[styles.text, {fontFamily: 'Cochin'}]}>Cochin</Text>
      <Text style={[styles.text, {fontFamily: 'Cochin-Bold'}]}>
        Cochin-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Cochin-BoldItalic'}]}>
        Cochin-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Cochin-Italic'}]}>
        Cochin-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Copperplate'}]}>
        Copperplate
      </Text>
      <Text style={[styles.text, {fontFamily: 'Copperplate-Bold'}]}>
        Copperplate-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Copperplate-Light'}]}>
        Copperplate-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Courier'}]}>Courier</Text>
      <Text style={[styles.text, {fontFamily: 'Courier New'}]}>
        Courier New
      </Text>
      <Text style={[styles.text, {fontFamily: 'Courier-Bold'}]}>
        Courier-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Courier-BoldOblique'}]}>
        Courier-BoldOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Courier-Oblique'}]}>
        Courier-Oblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'CourierNewPS-BoldItalicMT'}]}>
        CourierNewPS-BoldItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'CourierNewPS-BoldMT'}]}>
        CourierNewPS-BoldMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'CourierNewPS-ItalicMT'}]}>
        CourierNewPS-ItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'CourierNewPSMT'}]}>
        CourierNewPSMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'Damascus'}]}>Damascus</Text>
      <Text style={[styles.text, {fontFamily: 'DamascusBold'}]}>
        DamascusBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'DamascusLight'}]}>
        DamascusLight
      </Text>
      <Text style={[styles.text, {fontFamily: 'DamascusMedium'}]}>
        DamascusMedium
      </Text>
      <Text style={[styles.text, {fontFamily: 'DamascusSemiBold'}]}>
        DamascusSemiBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Devanagari Sangam MN'}]}>
        Devanagari Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'DevanagariSangamMN'}]}>
        DevanagariSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'DevanagariSangamMN-Bold'}]}>
        DevanagariSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Didot'}]}>Didot</Text>
      <Text style={[styles.text, {fontFamily: 'Didot-Bold'}]}>Didot-Bold</Text>
      <Text style={[styles.text, {fontFamily: 'Didot-Italic'}]}>
        Didot-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'DiwanMishafi'}]}>
        DiwanMishafi
      </Text>
      <Text style={[styles.text, {fontFamily: 'Euphemia UCAS'}]}>
        Euphemia UCAS
      </Text>
      <Text style={[styles.text, {fontFamily: 'EuphemiaUCAS-Bold'}]}>
        EuphemiaUCAS-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'EuphemiaUCAS-Italic'}]}>
        EuphemiaUCAS-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Farah'}]}>Farah</Text>
      <Text style={[styles.text, {fontFamily: 'Futura'}]}>Futura</Text>
      <Text style={[styles.text, {fontFamily: 'Futura-CondensedExtraBold'}]}>
        Futura-CondensedExtraBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Futura-CondensedMedium'}]}>
        Futura-CondensedMedium
      </Text>
      <Text style={[styles.text, {fontFamily: 'Futura-Medium'}]}>
        Futura-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'Futura-MediumItalic'}]}>
        Futura-MediumItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Geeza Pro'}]}>Geeza Pro</Text>
      <Text style={[styles.text, {fontFamily: 'GeezaPro-Bold'}]}>
        GeezaPro-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Georgia'}]}>Georgia</Text>
      <Text style={[styles.text, {fontFamily: 'Georgia-Bold'}]}>
        Georgia-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Georgia-BoldItalic'}]}>
        Georgia-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Georgia-Italic'}]}>
        Georgia-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Gill Sans'}]}>Gill Sans</Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-Bold'}]}>
        GillSans-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-BoldItalic'}]}>
        GillSans-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-Italic'}]}>
        GillSans-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-Light'}]}>
        GillSans-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-LightItalic'}]}>
        GillSans-LightItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-SemiBold'}]}>
        GillSans-SemiBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-SemiBoldItalic'}]}>
        GillSans-SemiBoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'GillSans-UltraBold'}]}>
        GillSans-UltraBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Gujarati Sangam MN'}]}>
        Gujarati Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'GujaratiSangamMN'}]}>
        GujaratiSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'GujaratiSangamMN-Bold'}]}>
        GujaratiSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Gurmukhi MN'}]}>
        Gurmukhi MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'GurmukhiMN-Bold'}]}>
        GurmukhiMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Heiti SC'}]}>Heiti SC</Text>
      <Text style={[styles.text, {fontFamily: 'Heiti TC'}]}>Heiti TC</Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica'}]}>Helvetica</Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica Neue'}]}>
        Helvetica Neue
      </Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica-Bold'}]}>
        Helvetica-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica-BoldOblique'}]}>
        Helvetica-BoldOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica-Light'}]}>
        Helvetica-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica-LightOblique'}]}>
        Helvetica-LightOblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'Helvetica-Oblique'}]}>
        Helvetica-Oblique
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-Bold'}]}>
        HelveticaNeue-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-BoldItalic'}]}>
        HelveticaNeue-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-CondensedBlack'}]}>
        HelveticaNeue-CondensedBlack
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-CondensedBold'}]}>
        HelveticaNeue-CondensedBold
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-Italic'}]}>
        HelveticaNeue-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-Light'}]}>
        HelveticaNeue-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-LightItalic'}]}>
        HelveticaNeue-LightItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-Medium'}]}>
        HelveticaNeue-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-MediumItalic'}]}>
        HelveticaNeue-MediumItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-Thin'}]}>
        HelveticaNeue-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-ThinItalic'}]}>
        HelveticaNeue-ThinItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HelveticaNeue-UltraLight'}]}>
        HelveticaNeue-UltraLight
      </Text>
      <Text
        style={[styles.text, {fontFamily: 'HelveticaNeue-UltraLightItalic'}]}>
        HelveticaNeue-UltraLightItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Hiragino Mincho ProN'}]}>
        Hiragino Mincho ProN
      </Text>
      <Text style={[styles.text, {fontFamily: 'Hiragino Sans'}]}>
        Hiragino Sans
      </Text>
      <Text style={[styles.text, {fontFamily: 'HiraginoSans-W3'}]}>
        HiraginoSans-W3
      </Text>
      <Text style={[styles.text, {fontFamily: 'HiraginoSans-W6'}]}>
        HiraginoSans-W6
      </Text>
      <Text style={[styles.text, {fontFamily: 'HiraMinProN-W3'}]}>
        HiraMinProN-W3
      </Text>
      <Text style={[styles.text, {fontFamily: 'HiraMinProN-W6'}]}>
        HiraMinProN-W6
      </Text>
      <Text style={[styles.text, {fontFamily: 'Hoefler Text'}]}>
        Hoefler Text
      </Text>
      <Text style={[styles.text, {fontFamily: 'HoeflerText-Black'}]}>
        HoeflerText-Black
      </Text>
      <Text style={[styles.text, {fontFamily: 'HoeflerText-BlackItalic'}]}>
        HoeflerText-BlackItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HoeflerText-Italic'}]}>
        HoeflerText-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'HoeflerText-Regular'}]}>
        HoeflerText-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'Iowan Old Style'}]}>
        Iowan Old Style
      </Text>
      <Text style={[styles.text, {fontFamily: 'IowanOldStyle-Bold'}]}>
        IowanOldStyle-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'IowanOldStyle-BoldItalic'}]}>
        IowanOldStyle-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'IowanOldStyle-Italic'}]}>
        IowanOldStyle-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'IowanOldStyle-Roman'}]}>
        IowanOldStyle-Roman
      </Text>
      <Text style={[styles.text, {fontFamily: 'Kailasa'}]}>Kailasa</Text>
      <Text style={[styles.text, {fontFamily: 'Kailasa-Bold'}]}>
        Kailasa-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Kannada Sangam MN'}]}>
        Kannada Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'KannadaSangamMN'}]}>
        KannadaSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'KannadaSangamMN-Bold'}]}>
        KannadaSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Khmer Sangam MN'}]}>
        Khmer Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'Kohinoor Bangla'}]}>
        Kohinoor Bangla
      </Text>
      <Text style={[styles.text, {fontFamily: 'Kohinoor Devanagari'}]}>
        Kohinoor Devanagari
      </Text>
      <Text style={[styles.text, {fontFamily: 'Kohinoor Telugu'}]}>
        Kohinoor Telugu
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorBangla-Light'}]}>
        KohinoorBangla-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorBangla-Regular'}]}>
        KohinoorBangla-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorBangla-Semibold'}]}>
        KohinoorBangla-Semibold
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorDevanagari-Light'}]}>
        KohinoorDevanagari-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorDevanagari-Regular'}]}>
        KohinoorDevanagari-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorDevanagari-Semibold'}]}>
        KohinoorDevanagari-Semibold
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorTelugu-Light'}]}>
        KohinoorTelugu-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorTelugu-Medium'}]}>
        KohinoorTelugu-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'KohinoorTelugu-Regular'}]}>
        KohinoorTelugu-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'Lao Sangam MN'}]}>
        Lao Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'Malayalam Sangam MN'}]}>
        Malayalam Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'MalayalamSangamMN'}]}>
        MalayalamSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'MalayalamSangamMN-Bold'}]}>
        MalayalamSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Marker Felt'}]}>
        Marker Felt
      </Text>
      <Text style={[styles.text, {fontFamily: 'MarkerFelt-Thin'}]}>
        MarkerFelt-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'MarkerFelt-Wide'}]}>
        MarkerFelt-Wide
      </Text>
      <Text style={[styles.text, {fontFamily: 'Menlo'}]}>Menlo</Text>
      <Text style={[styles.text, {fontFamily: 'Menlo-Bold'}]}>Menlo-Bold</Text>
      <Text style={[styles.text, {fontFamily: 'Menlo-BoldItalic'}]}>
        Menlo-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Menlo-Italic'}]}>
        Menlo-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Menlo-Regular'}]}>
        Menlo-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'Mishafi'}]}>Mishafi</Text>
      <Text style={[styles.text, {fontFamily: 'Noteworthy'}]}>Noteworthy</Text>
      <Text style={[styles.text, {fontFamily: 'Noteworthy'}]}>張寧</Text>
      <Text style={[styles.text, {fontFamily: 'Noteworthy-Bold'}]}>
        Noteworthy-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Noteworthy-Light'}]}>
        Noteworthy-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Optima'}]}>Optima</Text>
      <Text style={[styles.text, {fontFamily: 'Optima-Bold'}]}>
        Optima-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Optima-BoldItalic'}]}>
        Optima-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Optima-ExtraBlack'}]}>
        Optima-ExtraBlack
      </Text>
      <Text style={[styles.text, {fontFamily: 'Optima-Italic'}]}>
        Optima-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Optima-Regular'}]}>
        Optima-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'Oriya Sangam MN'}]}>
        Oriya Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'OriyaSangamMN'}]}>
        OriyaSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'OriyaSangamMN-Bold'}]}>
        OriyaSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Palatino'}]}>Palatino</Text>
      <Text style={[styles.text, {fontFamily: 'Palatino-Bold'}]}>
        Palatino-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Palatino-BoldItalic'}]}>
        Palatino-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Palatino-Italic'}]}>
        Palatino-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Palatino-Roman'}]}>
        Palatino-Roman
      </Text>
      <Text style={[styles.text, {fontFamily: 'Papyrus'}]}>Papyrus</Text>
      <Text style={[styles.text, {fontFamily: 'Papyrus-Condensed'}]}>
        Papyrus-Condensed
      </Text>
      <Text style={[styles.text, {fontFamily: 'Party LET'}]}>Party LET</Text>
      <Text style={[styles.text, {fontFamily: 'PartyLetPlain'}]}>
        PartyLetPlain
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFang HK'}]}>
        PingFang HK
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFang SC'}]}>
        PingFang SC
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFang TC'}]}>
        PingFang TC
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Light'}]}>
        PingFangHK-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Medium'}]}>
        PingFangHK-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Regular'}]}>
        PingFangHK-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Semibold'}]}>
        PingFangHK-Semibold
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Thin'}]}>
        PingFangHK-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangHK-Ultralight'}]}>
        PingFangHK-Ultralight
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Light'}]}>
        PingFangSC-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Medium'}]}>
        PingFangSC-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Regular'}]}>
        PingFangSC-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Semibold'}]}>
        PingFangSC-Semibold
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Thin'}]}>
        PingFangSC-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangSC-Ultralight'}]}>
        PingFangSC-Ultralight
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Light'}]}>
        PingFangTC-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Medium'}]}>
        PingFangTC-Medium
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Regular'}]}>
        PingFangTC-Regular
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Semibold'}]}>
        PingFangTC-Semibold
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Thin'}]}>
        PingFangTC-Thin
      </Text>
      <Text style={[styles.text, {fontFamily: 'PingFangTC-Ultralight'}]}>
        PingFangTC-Ultralight
      </Text>
      <Text style={[styles.text, {fontFamily: 'Savoye LET'}]}>Savoye LET</Text>
      <Text style={[styles.text, {fontFamily: 'SavoyeLetPlain'}]}>
        SavoyeLetPlain
      </Text>
      <Text style={[styles.text, {fontFamily: 'Sinhala Sangam MN'}]}>
        Sinhala Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'SinhalaSangamMN'}]}>
        SinhalaSangamMN
      </Text>
      <Text style={[styles.text, {fontFamily: 'SinhalaSangamMN-Bold'}]}>
        SinhalaSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Snell Roundhand'}]}>
        Snell Roundhand
      </Text>
      <Text style={[styles.text, {fontFamily: 'SnellRoundhand-Black'}]}>
        SnellRoundhand-Black
      </Text>
      <Text style={[styles.text, {fontFamily: 'SnellRoundhand-Bold'}]}>
        SnellRoundhand-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Symbol'}]}>Symbol</Text>
      <Text style={[styles.text, {fontFamily: 'Tamil Sangam MN'}]}>
        Tamil Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'TamilSangamMN-Bold'}]}>
        TamilSangamMN-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Telugu Sangam MN'}]}>
        Telugu Sangam MN
      </Text>
      <Text style={[styles.text, {fontFamily: 'Thonburi'}]}>Thonburi</Text>
      <Text style={[styles.text, {fontFamily: 'Thonburi-Bold'}]}>
        Thonburi-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Thonburi-Light'}]}>
        Thonburi-Light
      </Text>
      <Text style={[styles.text, {fontFamily: 'Times New Roman'}]}>
        Times New Roman
      </Text>
      <Text style={[styles.text, {fontFamily: 'TimesNewRomanPS-BoldItalicMT'}]}>
        TimesNewRomanPS-BoldItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'TimesNewRomanPS-BoldMT'}]}>
        TimesNewRomanPS-BoldMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'TimesNewRomanPS-ItalicMT'}]}>
        TimesNewRomanPS-ItalicMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'TimesNewRomanPSMT'}]}>
        TimesNewRomanPSMT
      </Text>
      <Text style={[styles.text, {fontFamily: 'Trebuchet MS'}]}>
        Trebuchet MS
      </Text>
      <Text style={[styles.text, {fontFamily: 'Trebuchet-BoldItalic'}]}>
        Trebuchet-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'TrebuchetMS-Bold'}]}>
        TrebuchetMS-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'TrebuchetMS-Italic'}]}>
        TrebuchetMS-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Verdana'}]}>Verdana</Text>
      <Text style={[styles.text, {fontFamily: 'Verdana-Bold'}]}>
        Verdana-Bold
      </Text>
      <Text style={[styles.text, {fontFamily: 'Verdana-BoldItalic'}]}>
        Verdana-BoldItalic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Verdana-Italic'}]}>
        Verdana-Italic
      </Text>
      <Text style={[styles.text, {fontFamily: 'Zapf Dingbats'}]}>
        Zapf Dingbats
      </Text>
      <Text style={[styles.text, {fontFamily: 'ZapfDingbatsITC'}]}>
        ZapfDingbatsITC
      </Text>
      <Text style={[styles.text, {fontFamily: 'Zapfino'}]}>Zapfino</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});
