# main.py
import sys
from countryinfo import CountryInfo
import re


#First parameter is the replacement, second parameter is your input string

#Out: 'abdE'

countries = ['Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Côte d'Ivoire", 'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', "Korea, Democratic People's Republic of", 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'South Sudan', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela, Bolivarian Republic of', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe']

def main():
    regex = re.compile('[^a-zA-Z]')
    capitalLength = int(sys.argv[1])
    possibilities = []

    # Initialize possibilities
    for country in countries:
        countryInfo = CountryInfo(country)
        country = regex.sub('', country)
        try:
            capital = regex.sub('', countryInfo.capital())
            if(len(capital) == capitalLength):
                # if(len(capital) == 9):
                #     print("THERES 1 HERE IDIOT YOUR CODE SUCKS")
                possibilities.append({"country": country, "capital": capital})
        except:
            pass

    print("Possible capitals: ")
    leftKeywords = []
    rightKeywords = []
    for possibility in possibilities:
        print("{} ({})".format(possibility["country"], possibility["capital"]))
    while(True):
        rawKeyword = input("Enter possible image names like: 1 [name] or 2 [name]")
        splitKeyword = rawKeyword.split()
        if splitKeyword[0] == '1':
            leftKeywords.append(splitKeyword[1])
        elif splitKeyword[0] == '2':
            rightKeywords.append(splitKeyword[1])

        match = doSearch(leftKeywords, rightKeywords, possibilities)
        if(match is not None):
            print("{} ({})".format(match["country"], match["capital"]))
            break
        

def doSearch(leftKeywords, rightKeywords, possibilities):
    for leftKeyword in leftKeywords:
        for rightKeyword in rightKeywords:
            combinedWord = leftKeyword + rightKeyword
            # Check if country name is in combinedWord
        
            for possibility in possibilities:
                if(possibility['country'].lower() in combinedWord.lower()):
                    return possibility
    
    return None

    # lengths = []
    # for i, arg in enumerate(sys.argv):
    #     if i == 0:
    #         continue
    #     length = 0
    #     for c in arg:
    #         if c != '_':
    #             print("Invalid input, expected _")
    #             return
    #         length += 1
    #     lengths.append(length)

    # print("Capital is {} word(s): ".format(len(lengths)))
    # for length in lengths:
    #     print("{} letter(s)".format(length))

    # for country in countries:
    #     print(country)
    #     countryInfo = CountryInfo(country)
    #     try:
    #         capital = regex.sub('', countryInfo.capital())
    #         print(capital)
    #     except:
    #         print("NOT FOUND")
            




if __name__ == "__main__":
    main()
    
        
