from selenium import webdriver
import unittest
import time

class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_view_a_list_of_book(self):
        # Marry is looking for a book to prepare the exams
        # Marry go to Get-A.com
        self.browser.get('http://localhost:3000')
        time.sleep(0.5)

        # Marry see the top 3 best score books
        table_best_book = self.browser.find_element_by_id('best_book')
        columns = table_best_book.find_elements_by_tag_name('td')
        self.assertIn('Digital', [column.text for column in columns])
        self.assertIn('Circuit', [column.text for column in columns])
        self.assertIn('Analog', [column.text for column in columns])

        # Marry see many categories and search box
        checkbox = self.browser.find_element_by_id('categories')
        inputbox = checkbox.find_elements_by_tag_name('input')
        self.assertEqual(inputbox[0].get_attribute('name'), 'com')
        self.assertEqual(inputbox[1].get_attribute('name'), 'math')
        self.assertEqual(inputbox[-2].get_attribute('name'), 'book_name')
        self.assertEqual(inputbox[-1].get_attribute('value'), 'Search')

        # Marry choose categories “Computer” and "Math"
        time.sleep(0.5)
        inputbox[0].click()
        inputbox[1].click()

        # Marry type "Discrete" in search box
        time.sleep(0.5)
        inputbox[4].send_keys('Discrete')

        # Marry click "Search"
        time.sleep(0.5)
        inputbox[5].click()

        # Marry found “Discrete Math” that score 4.2 from 5 star
        table_search_book = self.browser.find_element_by_id('search_book')
        rows = table_search_book.find_elements_by_tag_name('td')
        self.assertIn('Discrete Math', [row.text for row in rows])

        # Marry quit a website
        time.sleep(3)
        self.browser.quit()

if __name__ == '__main__':
    unittest.main(warnings='ignore')
